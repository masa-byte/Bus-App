import { Body, Controller, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {

    constructor(private readonly ticketService: TicketService) { }

    @Post()
    async createTicket(@Body('ticket') ticket: any): Promise<any> {
        try {
            const res = await this.ticketService.createTicket(ticket)
            return res
        } catch (error) {
            return false
        }
    }

}
