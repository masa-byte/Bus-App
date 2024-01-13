import { Controller, Get, HttpStatus } from '@nestjs/common';
import { TownService } from './town.service';

@Controller('town')
export class TownController {

    constructor(private readonly townService: TownService) { }

    @Get()
    async users() {
        try {
            const users = await this.townService.getAllTowns()
            return users
        } catch (error) {
            return HttpStatus.NOT_FOUND
        }
    }
}
