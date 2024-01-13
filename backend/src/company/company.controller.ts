import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Public } from 'src/auth/decorators/metadata';

@Controller('company')
export class CompanyController {

    constructor(private readonly companyService: CompanyService) { }

    @Get('total')
    async totalNumberOfCompanies() {
        try {
            const numberOfCompanies = await this.companyService.getTotalNumberOfCompanies()
            return numberOfCompanies
        } catch (error) {
            return HttpStatus.NOT_FOUND
        }
    }

    @Get()
    async companiesByPageIndexPageSize(@Query('pageIndex') pageIndex: number, @Query('pageSize') pageSize: number) {
        try {
            const companies = await this.companyService.getCompaniesByPageIndexPageSize(pageIndex, pageSize)
            return companies
        } catch (error) {
            return HttpStatus.NOT_FOUND
        }
    }

    @Put('rate/:id')
    async rateCompany(@Param('id') id: string, @Body('rating') rating: number) {
        try {
            const res = await this.companyService.rateCompany(id, rating)
            return res
        } catch (error) {
            return HttpStatus.NOT_FOUND
        }
    }

    @Delete(':id')
    async deleteCompany(@Param('id') id: string) {
        try {
            await this.companyService.deleteCompany(id)
            return HttpStatus.OK
        } catch (error) {
            return HttpStatus.NOT_FOUND
        }
    }
}
