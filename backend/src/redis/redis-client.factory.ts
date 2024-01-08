import { FactoryProvider } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisClient, REDIS_CLIENT } from './redis-client.type';

export const redisClientFactory: FactoryProvider<Promise<RedisClient>> = {
    provide: REDIS_CLIENT,
    useFactory: async () => {
        try {
            const client = createClient({ url: 'redis://localhost:6379/0' });
            await client.connect();
            return client;
        } catch (error) {
            console.error(error);
        }
    },
};