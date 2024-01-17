import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/my-neo4j/neo4j.service';

@Injectable()
export class TicketService {

    constructor(
        private readonly neo4jService: Neo4jService,
    ) { }

    async createTicket(ticket: any): Promise<any> {
        // ovde redis lock da bi se osiguralo da se broj slobodnih mesta korektno menja




        // ovde se otpusta i ide potvrda da li je uspesno ili nema vise mesta
    }
}
