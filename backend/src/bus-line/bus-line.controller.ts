import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { BusLineService } from './bus-line.service';
import { Public } from 'src/auth/decorators/metadata';

@Controller('bus-line')
export class BusLineController {

    constructor(private readonly busLineService: BusLineService) { }

    @Get('total')
    async totalNumberOfBusLines(@Query('startDestId') startDestId: number, @Query('endDestId') endDestId: number) {
        try {
            const numberOfBusLines = await this.busLineService.getTotalBusLinesByStartDestEndDest(startDestId, endDestId)
            return numberOfBusLines
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }

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

    @Get('all/:companyId')
    async getAllBusLineIdsForCompany(@Param('companyId') companyId: string) {
        try {
            const res = await this.busLineService.getAllBusLineIdsForCompany(companyId);
            return res
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

    @Post('departure-times')
    async createBusLineDepartureTimes(@Body('busLineDepartureTimes') busLineDepartureTimes: any) {
        try {
            const res = await this.busLineService.createBusLineDepartureTimes(busLineDepartureTimes);
            return res
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }

    @Delete(':busLineId/:companyId')
    async deleteBusLine(@Param('busLineId') busLineId: string, @Param('companyId') companyId: string) {
        try {
            await this.busLineService.deleteBusLine(busLineId, companyId);
            return HttpStatus.OK
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }
}
