import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { BusLineService } from './bus-line.service';
import { Public } from 'src/auth/decorators/metadata';

@Controller('bus-line')
export class BusLineController {

    constructor(private readonly busLineService: BusLineService) { }

    @Public()
    @Get('total')
    async totalNumberOfBusLines(@Query('startDestId') startDestId: number, @Query('endDestId') endDestId: number) {
        try {
            const numberOfBusLines = await this.busLineService.getTotalBusLinesByStartDestEndDest(startDestId, endDestId)
            return numberOfBusLines
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }

    @Public()
    @Get()
    async getBusLinesByStartDestEndDest(
        @Query('startDestId') startDestId: number,
        @Query('endDestId') endDestId: number,
        @Query('pageIndex') pageIndex: number,
        @Query('pageSize') pageSize: number
    ) {
        try {
            const busLines = await this.busLineService.getBusLinesByStartDestEndDestPageIndexPageSize(startDestId, endDestId, pageIndex, pageSize);
            return busLines
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }
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
