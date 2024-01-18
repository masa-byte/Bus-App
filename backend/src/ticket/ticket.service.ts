import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/my-neo4j/neo4j.service';
import { Ticket } from './ticket.entity';
import { mapNeo4jNodeToTicket } from 'src/utility/utility';

@Injectable()
export class TicketService {

    constructor(
        private readonly neo4jService: Neo4jService,
    ) { }

    async createTicket(ticket: any): Promise<any> {
        // ovde redis lock da bi se osiguralo da se broj slobodnih mesta korektno menja
        let successful = false;
        ticket.id = null;
        let ticketToCreate = {
            ...ticket,
            dateCreated: new Date().toISOString(),
        };
        const res = await this.neo4jService.write(`CREATE (n:Ticket $ticketToCreate) RETURN n`, { ticketToCreate })

        const query = `
        MATCH (c:Company)-[r:TIMETABLE {busLineId: '${ticket.busLineId}'}]
        ->(dt:DepartureTimes)
        -[r2:HAS_SPECIFIC_DEPARTURE {date: '${ticket.departureDate}'}]
        ->(s:SpecificDepTime {departureTime: '${ticket.departureTime}'})
        WHERE id(c) = ${ticket.companyId}
        RETURN s.capacity as capacity
        `;
        console.log(query);
        const res2 = await this.neo4jService.read(query)
        const capacity = res2.records[0].get('capacity').toNumber();
        console.log(capacity);
        if (capacity <= 0) {
            successful = false;
        }
        else {
            const newCapacity = capacity - 1;
            const query2 = `
                MATCH (c:Company)-[r:TIMETABLE {busLineId: '${ticket.busLineId}'}]
                ->(dt:DepartureTimes)
                -[r2:HAS_SPECIFIC_DEPARTURE {date: '${ticket.departureDate}'}]
                ->(s:SpecificDepTime {departureTime: '${ticket.departureTime}'})
                WHERE id(c) = ${ticket.companyId}
                SET s.capacity = ${newCapacity}
                `;
            const res3 = await this.neo4jService.write(query2);
            successful = true;
        }

        // ovde se otpusta i ide potvrda da li je uspesno ili nema vise mesta
        return successful;
    }
}
