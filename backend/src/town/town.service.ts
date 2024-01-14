import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/my-neo4j/neo4j.service';
import { Town } from './town.entity';
import { mapNeo4jNodeToTown } from 'src/utility/utility';

@Injectable()
export class TownService {

    constructor(
        private readonly neo4jService: Neo4jService
    ) { }

    async getAllTowns(): Promise<Town[]> {
        const res = await this.neo4jService.read(`MATCH (n:Town) RETURN n`)
        if (res.records.length === 0) {
            return []
        }
        return res.records.map(record => mapNeo4jNodeToTown(record.get('n')))
    }
}
