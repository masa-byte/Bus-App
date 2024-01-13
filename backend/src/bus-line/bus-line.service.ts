import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/my-neo4j/neo4j.service';
import { UtilityService } from 'src/utility/utility.service';
import { BusLine } from './bus-line.entity';

@Injectable()
export class BusLineService {

    constructor(
        private readonly neo4jService: Neo4jService,
        private readonly utilityService: UtilityService
    ) { }

    async createBusLine(busLine: any): Promise<void> {
        let busLineToCreate = {
            ...busLine,
            dateCreated: new Date().toISOString(),
        };
    }
}

/*
{
  id: '',
  companyId: '7',
  companyName: 'as',
  regularPriceFactor: '1',
  returnPriceFactor: '1',
  studentDiscount: '10',
  seniorDiscount: '10',
  groupDiscount: '10',
  stops: [
    {
      id: '8',
      name: 'Mokrin',
      population: '5270',
      latitude: '45.9347',
      longitude: '20.4044'
    },
    {
      id: '10',
      name: 'Beograd',
      population: '1378682',
      latitude: '44.8200',
      longitude: '20.4600'
    }
  ]
*/