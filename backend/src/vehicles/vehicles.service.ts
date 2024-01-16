import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { Observable, Subject } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class VehiclesService {  

  private locationUpdates$: Subject<any> = new Subject<any>();

  constructor(
    //@InjectRedis() private readonly redis: Redis
    private readonly redisService: RedisService,
  ) {
    this.redisService.redis.subscribe('locationUpdates', (data, count) => {
      console.log(`Subscribed to ${count} channel.`, data);
      this.locationUpdates$.next(data);
      
    }).then((data) => {
      console.log(data);

    })
    .catch((err) => {
      console.log(err);
    });
  }

  async findByBoundigBox(lon: number, lat: number, w: number, h: number) {
    return await this.redisService.findByBoundigBox(lon, lat, w, h);
  }

  locationUpdates(): Observable<any> {
    return this.locationUpdates$.asObservable();
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
