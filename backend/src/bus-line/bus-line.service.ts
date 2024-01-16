import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/my-neo4j/neo4j.service';
import { BusLine } from './bus-line.entity';
import { mapNeo4jNodeToBusLineDepartureTime, mapNeo4jNodeToTown } from 'src/utility/utility';
import { BusLineDepartureTimes } from './bus-line-departure-times.entity';

@Injectable()
export class BusLineService {

  constructor(
    private readonly neo4jService: Neo4jService,
  ) { }

  async getTotalBusLinesByStartDestEndDest(startDestId: number, endDestId: number): Promise<number> {
    const query = `
    MATCH p = (start:Town)-[rel:BUS_LINE*]->(end:Town)
    WHERE id(start) = ${startDestId} AND id(end) = ${endDestId}
    WITH relationships(p) as relationships, nodes(p) as towns, start, end
    UNWIND relationships as rel
    WITH rel, start, end, towns
    WHERE ALL(r IN relationships WHERE r.busLineId = rel.busLineId AND r.companyName = rel.companyName AND r.companyId = rel.companyId)
    with DISTINCT {
        busLineId: rel.busLineId,
        companyName: rel.companyName,
        companyId: rel.companyId
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
    MATCH p = (start:Town)-[rel:BUS_LINE*]->(end:Town)
    WHERE id(start) = ${startDestId} AND id(end) = ${endDestId}
    WITH relationships(p) as relationships, nodes(p) as towns, start, end
    UNWIND relationships as rel
    WITH rel, start, end, towns
    WHERE ALL(r IN relationships WHERE r.busLineId = rel.busLineId AND r.companyName = rel.companyName AND r.companyId = rel.companyId)
    with DISTINCT {
        busLineId: rel.busLineId,
        companyName: rel.companyName,
        companyId: rel.companyId
        } AS line
    return line.busLineId as busLineId, line.companyId as companyId, line.companyName as companyName
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
      busLine.distance = 0;
      busLine.oneWayPrice = 0;
      busLine.returnPrice = 0;
      busLine.discount = 0;
      busLine.durationMinutes = 0;
      return busLine;
    })

    for (let busLine of busLines) {
      let query = `
      MATCH p = (start:Town)-[r:BUS_LINE* {busLineId:'${busLine.busLineId}', companyId: '${busLine.companyId}'}]->(end:Town)
      WHERE id(start) = ${startDestId} AND id(end) = ${endDestId}
      WITH relationships(p) as relationships, nodes(p) as towns, start, end
      UNWIND relationships as rel
      WITH rel, towns
      UNWIND towns AS town
      RETURN DISTINCT town
    `;
      const res = await this.neo4jService.read(query)

      busLine.stops = res.records.map(record => mapNeo4jNodeToTown(record.get('town')))

      for (let i = 0; i < busLine.stops.length - 1; i++) {
        query = `
        MATCH p = (t1:Town)-[r:CONNECTS]-(t2:Town) 
        WHERE id(t1) = ${busLine.stops[i].id} AND id(t2) = ${busLine.stops[i + 1].id} 
        RETURN r.km AS km, r.price AS price
        `;
        const res = await this.neo4jService.read(query)
        res.records.map(record => {
          busLine.distance += +record.get('km');
          busLine.oneWayPrice += record.get('price');
        })
      }
      busLine.distance = Math.round(busLine.distance);

      const kmPerMinute = 1.33; // equals to 80 km/h
      busLine.durationMinutes = Math.round(busLine.distance / kmPerMinute);

      query = `
      MATCH (n:Company) WHERE id(n) = ${busLine.companyId}
      RETURN n.discount AS discount, n.regularPriceFactor AS regularPriceFactor, n.returnPriceFactor AS returnPriceFactor
      `;

      const res2 = await this.neo4jService.read(query)
      res2.records.map(record => {
        busLine.discount += +record.get('discount');
        busLine.returnPrice = Math.round(busLine.oneWayPrice * record.get('returnPriceFactor'));
        busLine.oneWayPrice *= Math.round(record.get('regularPriceFactor'));
      })
    }
    return busLines;
  }

  async getAllBusLineIdsForCompany(companyId: string): Promise<string[]> {
    const query = `
    MATCH (t1:Town)-[r:BUS_LINE {companyId: '${companyId}'}]->(t2:Town) 
    RETURN DISTINCT r.busLineId AS busLineId
    `;
    const res = await this.neo4jService.read(query)
    return res.records.map(record => record.get('busLineId'));
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

  async createBusLineDepartureTimes(busLineDepartureTimes: any): Promise<BusLineDepartureTimes> {

    await this.deleteBusLineDepartureTimes(busLineDepartureTimes.busLineId, busLineDepartureTimes.companyId);

    let departureTimesToCreate = {
      departureTimes: busLineDepartureTimes.departureTimes,
      capacities: busLineDepartureTimes.capacities,
      dateCreated: new Date().toISOString(),
    };

    const res = await this.neo4jService.write(`CREATE (n:DepartureTimes $departureTimesToCreate) RETURN n`, { departureTimesToCreate })
    const depTimeId = res.records[0].get('n').identity.toString();

    const query = `
    MATCH (c:Company), (dt:DepartureTimes) WHERE id(c) = ${busLineDepartureTimes.companyId} AND id(dt) = ${depTimeId} 
      CREATE (c)-[r:TIMETABLE {busLineId: '${busLineDepartureTimes.busLineId}'}]->(dt)`;

    const res2 = await this.neo4jService.write(query);
    const toReturn = mapNeo4jNodeToBusLineDepartureTime(res2.records[0].get('n'));
    toReturn.busLineId = busLineDepartureTimes.busLineId;
    toReturn.companyId = busLineDepartureTimes.companyId;
    toReturn.companyName = busLineDepartureTimes.companyName;
    return toReturn;
  }

  async deleteBusLine(busLineId: string, companyId: string): Promise<void> {
    const query = `
    MATCH (t1:Town)-[r:BUS_LINE {busLineId: '${busLineId}', companyId: '${companyId}'}]->(t2:Town) 
    DELETE r
    `;
    await this.neo4jService.write(query);
  }

  async deleteBusLineDepartureTimes(busLineId: string, companyId: string): Promise<void> {
    const query = `
    MATCH (c:Company)-[r:TIMETABLE {busLineId: '${busLineId}'}]->(dt:DepartureTimes) 
    WHERE id(c) = ${companyId}
    DELETE r, dt
    `;
    await this.neo4jService.write(query);
  }
}