import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Observable, Subject } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';
import { createClient } from 'redis';

@Injectable()
export class VehiclesService {  

  private locationUpdates$: Subject<any> = new Subject<any>();

  constructor(
    private readonly redisService: RedisService,
  ) {
    (async () => {
      const client = createClient({ url: 'redis://localhost:6379/0' });
      await client.connect();
      client.subscribe('locationUpdates', (data, count) => {
        console.log(`Subscribed to ${count} channel.`, data);
        this.locationUpdates$.next(data);
        
      }).then((data) => {
        console.log(data);
  
      })
      .catch((err) => {
        console.log(err);
      });
    })();
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
