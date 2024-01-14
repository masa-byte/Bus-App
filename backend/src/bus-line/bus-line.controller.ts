import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { BusLineService } from './bus-line.service';

@Controller('bus-line')
export class BusLineController {

    constructor(private readonly busLineService: BusLineService) { }

    @Post()
    async createBusLine(@Body('busLine') busLine: any) {
        try {
            const res = await this.busLineService.createBusLine(busLine);
            return res
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }
}
