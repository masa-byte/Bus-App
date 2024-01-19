import { Controller, Get, Query, Sse } from '@nestjs/common';
import { Public } from 'src/auth/decorators/metadata';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
    
    constructor(private readonly vehiclesService: VehiclesService) { }
    
    @Public()
    @Sse('locationUpdates')
    locationUpdates() {
        return this.vehiclesService.locationUpdates();
    }

    @Public()
    @Get('findByBoundigBox')
    findByBoundigBox(
        @Query('lat') lat: number = 0, 
        @Query('lng') lng: number = 0, 
        @Query('width') width: number = 0, 
        @Query('height') height: number = 0,
    ) {
        return this.vehiclesService.findByBoundigBox(lat, lng, width, height);
    }
}
