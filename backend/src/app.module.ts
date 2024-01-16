import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { neo4jConfig } from '../config';
import { MyNeo4jModule } from './my-neo4j/my-neo4j.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { VehiclesModule } from './vehicles/vehicles.module';
import { RedisModule } from './redis/redis.module';
//import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    Neo4jModule.forRoot(neo4jConfig),
    RedisModule,
    // RedisModule.forRoot({
    //   config: {
    //     host: 'localhost',
    //     port: 6379,
    //   }
    // }),
    MyNeo4jModule,
    AuthModule,
    UserModule,
    VehiclesModule
  ],
  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule { }
