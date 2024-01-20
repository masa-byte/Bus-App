import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/my-neo4j/neo4j.service';
import { Ticket } from './ticket.entity';
import { mapNeo4jNodeToTicket } from 'src/utility/utility';
import { CompanyService } from 'src/company/company.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TicketService {

    constructor(
        private readonly redisService: RedisService,
        private readonly neo4jService: Neo4jService,
        private readonly companyService: CompanyService,
    ) { }

    async totalNumberOfTicketsForUser(userId: string): Promise<number> {
        const query = `
        MATCH (u)-[r:BOUGHT_TICKET]->(t:Ticket)
        WHERE id(u) = ${userId}
        RETURN COUNT(t) AS count
        `;
        const res = await this.neo4jService.read(query);
        return res.records[0].get('count').toNumber();
    }

    async getTicketsByUserIdPageIndexPageSize(userId: string, pageIndex: number, pageSize: number): Promise<Ticket[]> {
        const query = `
        MATCH (u)-[r:BOUGHT_TICKET]->(t:Ticket { ratedCompany: false })
        WHERE id(u) = ${userId}
        RETURN t
        SKIP ${pageIndex * pageSize} LIMIT ${pageSize}
        `;
        const res = await this.neo4jService.read(query);
        if (res.records.length === 0) {
            return []
        }
        return res.records.map(record => mapNeo4jNodeToTicket(record.get('t')))
    }

    async createTicket(ticket: any): Promise<any> {
        await this.redisService.lock();
        try {
            let successful = false;
            const query1 = `
            MATCH (c:Company)-[r:TIMETABLE {busLineId: '${ticket.busLineId}'}]
            ->(dt:DepartureTimes)
            -[r2:HAS_SPECIFIC_DEPARTURE {date: '${ticket.departureDate}'}]
            ->(s:SpecificDepTime {departureTime: '${ticket.departureTime}'})
            WHERE id(c) = ${ticket.companyId}
            RETURN s.capacity as capacity
            `;
            const res1 = await this.neo4jService.read(query1)
            const capacity = res1.records[0].get('capacity');
            if (parseInt(capacity) <= ticket.numberOfSeats) {
                successful = false;
            }
            else {
                ticket.id = null;
                let ticketToCreate = {
                    ...ticket,
                    dateCreated: new Date().toISOString(),
                };
                const res2 = await this.neo4jService.write(`CREATE (n:Ticket $ticketToCreate) RETURN n`, { ticketToCreate })
                const ticketId = res2.records[0].get('n').identity.toNumber();

                // make relationship between user and ticket
                const query3 = `
                MATCH (u), (t:Ticket)
                WHERE id(u) = ${ticket.userId} AND id(t) = ${ticketId}
                CREATE (u)-[:BOUGHT_TICKET]->(t)
                `;
                const res3 = await this.neo4jService.write(query3);

                const query4 = `
                    MATCH (c:Company)-[r:TIMETABLE {busLineId: '${ticket.busLineId}'}]
                    ->(dt:DepartureTimes)
                    -[r2:HAS_SPECIFIC_DEPARTURE {date: '${ticket.departureDate}'}]
                    ->(s:SpecificDepTime {departureTime: '${ticket.departureTime}'})
                    WHERE id(c) = ${ticket.companyId}
                    SET s.capacity = ${parseInt(capacity) - parseInt(ticket.numberOfSeats)}
                    `;
                const res4 = await this.neo4jService.write(query4);
                successful = true;
            }
            return successful;
        }
        finally {
            await this.redisService.unlock();
        }
    }

    async rateCompany(ticketId: string, rating: number): Promise<any> {
        const res = await this.neo4jService.write(
            `MATCH (n:Ticket) WHERE id(n) = ${ticketId} SET n.ratedCompany = true RETURN  n.companyId as companyId`)
        if (res.records.length === 0) {
            return null;
        }
        const companyId = res.records[0].get('companyId');
        const company = await this.companyService.rateCompany(companyId, rating);
        return true;
    }
}
