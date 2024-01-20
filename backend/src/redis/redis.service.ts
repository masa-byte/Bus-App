import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from './redis-client.type';
import { VehicleLocationDto } from 'src/vehicles/vehicle-location.dto';

@Injectable()
export class RedisService implements OnModuleDestroy {
    private clientForSubscriber: RedisClient;
    
    public constructor(
        @Inject(REDIS_CLIENT) private readonly redis: RedisClient,
    ) { 
        (async () => {
            this.clientForSubscriber = await this.redis.duplicate();
            await this.clientForSubscriber.connect();
        })();
    }

    onModuleDestroy() {
        this.redis.quit();
        this.clientForSubscriber.unsubscribe();
        this.clientForSubscriber.quit();
    }

    ping(): Promise<string> {
        return this.redis.ping();
    }

    getClientForSubscriber(): RedisClient {
        return this.clientForSubscriber;
    }

    async findByBoundigBox(lat: number, lon: number, width: number, height: number): Promise<VehicleLocationDto[]> {
        return (await this.redis.sendCommand([
            'geosearch', 'vehicles', 
            'FROMLONLAT', lat.toString(), lon.toString(),
            'BYBOX', width.toString(), height.toString(), 'KM', 
            'WITHCOORD'
        ]) as any[]).map((item) => ({
            vehicleId: item[0],
            lat: item[1][0],
            lng: item[1][1]
        }));
    }

    async lock(): Promise<void> {
        let x = await this.redis.set('lock', 'lock', { NX: true }) === 'OK';
        while(x === false) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Lockovan sam");
            x = await this.redis.set('lock', 'lock', { NX: true }) === 'OK'
        }
    }

    async unlock(): Promise<boolean> {
        return await this.redis.del('lock') === 1;
    }
}
