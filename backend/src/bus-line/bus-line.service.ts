import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/my-neo4j/neo4j.service';
import { BusLine } from './bus-line.entity';
import { mapNeo4jNodeToTown } from 'src/utility/utility';

@Injectable()
export class BusLineService {

  constructor(
    private readonly neo4jService: Neo4jService,
  ) { }

  async getTotalBusLinesByStartDestEndDest(startDestId: number, endDestId: number): Promise<number> {
    const query = `
    MATCH (start:Town)-[rel:BUS_LINE*]-(end:Town)
    WHERE id(start) = ${startDestId} AND id(end) = ${endDestId}
    with DISTINCT {
    busLineId: rel[0].busLineId,
    companyName: rel[0].companyName,
    companyId: rel[0].companyId
    } AS line
    return COUNT(line) AS totalBusLines
  `;
    const res = await this.neo4jService.read(query)
    if (res.records.length === 0) {
      return 0
    }

    const neo4jInteger = res.records[0].get('totalBusLines')
    const count = neo4jInteger.toNumber();

    return count;
  }

  async getBusLinesByStartDestEndDestPageIndexPageSize
    (startDestId: number, endDestId: number, pageIndex: number, pageSize: number): Promise<BusLine[]> {
    const query = `
    MATCH (start:Town)-[rel:BUS_LINE*]-(end:Town)
    WHERE id(start) = ${startDestId} AND id(end) = ${endDestId}
    UNWIND rel as busLine
    RETURN DISTINCT busLine.busLineId as busLineId, busLine.companyName as companyName, busLine.companyId as companyId
    SKIP ${pageIndex * pageSize} LIMIT ${pageSize}
  `;
    const res = await this.neo4jService.read(query)
    if (res.records.length === 0) {
      return []
    }

    const busLines = res.records.map(record => {
      const busLine = new BusLine();
      busLine.id = null;
      busLine.busLineId = record.get('busLineId');
      busLine.companyName = record.get('companyName');
      busLine.companyId = record.get('companyId');
      return busLine;
    })

    for (let busLine of busLines) {
      let query = `
      MATCH p = (start:Town)-[r:BUS_LINE*]-(end:Town)
      WHERE id(start) = ${startDestId} AND id(end) = ${endDestId}
      WITH relationships(p) as relationships, nodes(p) as towns, start, end
      UNWIND relationships as rel
      WITH rel, towns
      WHERE rel.companyId = '${busLine.companyId}' and rel.busLineId = '${busLine.busLineId}'
      UNWIND towns AS town
      RETURN DISTINCT town
    `;
      const res = await this.neo4jService.read(query)

      busLine.stops = res.records.map(record => mapNeo4jNodeToTown(record.get('town')))
      busLine.distance = 0;
      busLine.price = 0;
      busLine.durationMinutes = 0;

      for (let i = 0; i < busLine.stops.length - 1; i++) {
        query = `
        MATCH p = (t1:Town)-[r:CONNECTS]-(t2:Town) 
        WHERE id(t1) = ${busLine.stops[i].id} AND id(t2) = ${busLine.stops[i + 1].id} 
        RETURN r.km AS km, r.price AS price
        `;
        const res = await this.neo4jService.read(query)
        res.records.map(record => {
          busLine.distance += +record.get('km');
          busLine.price += record.get('price');
        })
      }

      const kmPerMinute = 1.33; // equals to 80 km/h
      busLine.durationMinutes = Math.round(busLine.distance / kmPerMinute);
    }
    return busLines;
  }

  async createBusLine(busLine: any): Promise<string> {
    const res = await this.neo4jService.read(`MATCH (n:Company) WHERE id(n) = ${busLine.companyId} RETURN n.nextBusLineId AS nextBusLineId`)
    const busLineId = res.records[0].get('nextBusLineId')
    let stop1 = busLine.stops[0];
    let stop2;
    for (let i = 1; i < busLine.stops.length; i++) {
      stop2 = busLine.stops[i];
      const query = `
      MATCH (t1:Town), (t2:Town) WHERE id(t1) = ${stop1.id} AND id(t2) = ${stop2.id} 
      CREATE (t1)-[r:BUS_LINE {busLineId: '${busLineId}', companyId: '${busLine.companyId}', companyName: '${busLine.companyName}'}]->(t2)`;
      await this.neo4jService.write(query);
      stop1 = stop2;
    }
    await this.neo4jService.write(`MATCH (n:Company) WHERE id(n) = ${busLine.companyId} SET n.nextBusLineId = '${+busLineId + 1}'`)
    return res.records[0].get('nextBusLineId');
  }
}