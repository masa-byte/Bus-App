import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Neo4jModule } from 'nest-neo4j';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { neo4jConfig, postgreConfig } from '../config';
import { RedisModule } from './redis/redis.module';
import { MyNeo4jModule } from './my-neo4j/my-neo4j.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgreConfig),
    Neo4jModule.forRoot(neo4jConfig),
    RedisModule,
    MyNeo4jModule,
    AuthModule,
    UserModule
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
