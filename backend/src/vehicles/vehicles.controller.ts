import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Sse } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Observable } from 'rxjs';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.vehiclesService.findOne(+id);
  // }

  @Get('findByBoundigBox')
  async findByBoundigBox(@Query('lon') lon: number, @Query('lat') lat: number, @Query('w') w: number, @Query('h') h: number) {
    return await this.vehiclesService.findByBoundigBox(lon, lat, w, h);
  }

  @Sse('locationUpdates')
  locationUpdates(): Observable<any> {
    return this.vehiclesService.locationUpdates();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}