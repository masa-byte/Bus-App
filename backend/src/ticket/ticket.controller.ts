import { Body, Controller, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Public } from 'src/auth/decorators/metadata';

@Controller('ticket')
export class TicketController {

    constructor(private readonly ticketService: TicketService) { }

    @Get('user/total/:id')
    async getTotalNumberOfTickets(@Param('id') id: string) {
        try {
            const res = await this.ticketService.totalNumberOfTicketsForUser(id);
            return res
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }

    @Get('user/:id/:pageIndex/:pageSize')
    async getTicketsByUserIdPageIndexPageSize(
        @Param('id') id: string,
        @Param('pageIndex') pageIndex: number,
        @Param('pageSize') pageSize: number
    ) {
        try {
            const res = await this.ticketService.getTicketsByUserIdPageIndexPageSize(id, pageIndex, pageSize)
            return res
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }

    @Post()
    async createTicket(@Body('ticket') ticket: any) {
        try {
            const res = await this.ticketService.createTicket(ticket)
            return res
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }

    @Put('rate/:id')
    async rateCompany(@Param('id') id: string, @Body('rating') rating: number) {
        try {
            const res = await this.ticketService.rateCompany(id, rating)
            return res
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }
}
