import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/my-neo4j/neo4j.service';
import { BusLine } from './bus-line.entity';

@Injectable()
export class BusLineService {

  constructor(
    private readonly neo4jService: Neo4jService,
  ) { }

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