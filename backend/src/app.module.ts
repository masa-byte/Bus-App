import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { neo4jConfig } from '../config';
import { RedisModule } from './redis/redis.module';
import { MyNeo4jModule } from './my-neo4j/my-neo4j.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { CompanyModule } from './company/company.module';
import { UtilityModule } from './utility/utility.module';
import { TownModule } from './town/town.module';
import { BusLineModule } from './bus-line/bus-line.module';

@Module({
  imports: [
    Neo4jModule.forRoot(neo4jConfig),
    RedisModule,
    MyNeo4jModule,
    AuthModule,
    UserModule,
    CompanyModule,
    UtilityModule,
    TownModule,
    BusLineModule
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
  ],
})
export class AppModule { }
