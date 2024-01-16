import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from './redis-client.type';

@Injectable()
export class RedisService implements OnModuleDestroy {
    public constructor(
        @Inject(REDIS_CLIENT) public readonly redis: RedisClient,
    ) { }

    onModuleDestroy() {
        this.redis.quit();
    }

    ping(): Promise<string> {
        // this.redis.subscribe('locationUpdates', (data, count) => {
        //     console.log(`Subscribed to ${count} channel. `, data);
        // });
        return this.redis.ping();
    }

    async findByBoundigBox(lon: number, lat: number, w: number, h: number) {
        return await this.redis.sendCommand(['geosearch', 'vehicles', 'FROMLONLAT', lon.toString(), lat.toString(), 'BYBOX', w.toString(), h.toString(), 'KM', 'WITHCOORD']); // geoSearch('vehicles', 'FROMLONLAT', lon, lat, 'BYBOX', w, h, 'KM', 'WITHCOORD');
    }
}
