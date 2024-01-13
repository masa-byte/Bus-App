import { Body, Controller, Post } from '@nestjs/common';
import { BusLineService } from './bus-line.service';

@Controller('bus-line')
export class BusLineController {

    constructor(private readonly busLineService: BusLineService) { }

    @Post()
    async createBusLine(@Body('busLine') busLine: any) {
        try {
            console.log(busLine)
            const res = await this.busLineService.createBusLine(busLine);
            return res
        } catch (error) {
            return error
        }
    }
}
