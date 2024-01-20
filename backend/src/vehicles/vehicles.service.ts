import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';
import { VehicleLocationDto } from './vehicle-location.dto';

@Injectable()
export class VehiclesService {
    private readonly vehicleUpdate$ = new Subject();

    constructor(private readonly redisService: RedisService) { 
        this.redisService.getClientForSubscriber().subscribe('locationUpdates', (message) => {
            this.vehicleUpdate$.next(message);
        });
    }

    locationUpdates() {
        return this.vehicleUpdate$.asObservable();
    }

    async findByBoundigBox(lat: number, lng: number, width: number, height: number): Promise<VehicleLocationDto[]> {
        return await this.redisService.findByBoundigBox(lat, lng, width, height);
    }
}
