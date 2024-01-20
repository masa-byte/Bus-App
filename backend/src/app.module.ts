import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Neo4jModule } from 'nest-neo4j';
import { neo4jConfig } from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { BusLineModule } from './bus-line/bus-line.module';
import { CompanyModule } from './company/company.module';
import { MyNeo4jModule } from './my-neo4j/my-neo4j.module';
import { RedisModule } from './redis/redis.module';
import { TicketModule } from './ticket/ticket.module';
import { TownModule } from './town/town.module';
import { UserModule } from './user/user.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { CustomHttpCacheInterceptor } from './custom-cache-interceptor';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    //CacheModule.register(),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: (await redisStore.redisStore({
          url: 'redis://localhost:6379',
        })) as unknown as CacheStore,
      }),
    }),
    Neo4jModule.forRoot(neo4jConfig),
    RedisModule,
    MyNeo4jModule,
    AuthModule,
    UserModule,
    CompanyModule,
    TownModule,
    BusLineModule,
    TicketModule,
    VehiclesModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomHttpCacheInterceptor,
    },
  ],
})
export class AppModule { }
