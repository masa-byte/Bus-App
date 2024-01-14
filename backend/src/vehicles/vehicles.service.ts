import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class VehiclesService {
  
  constructor(
    @InjectRedis() private readonly redis: Redis
  ) {}

  async findByBoundigBox(lon: number, lat: number, w: number, h: number) {
    return await this.redis.geosearch('vehicles', 'FROMLONLAT', lon, lat, 'BYBOX', w, h, 'KM', 'WITHCOORD');
  }
  create(createVehicleDto: CreateVehicleDto) {
    return 'This action adds a new vehicle';
  }

  findAll() {
    return `This action returns all vehicles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
