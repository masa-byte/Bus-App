import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('redis-ping')
  redisPing() {
    return this.appService.redisPing();
  }

  @Get('neo4j-ping')
  neo4jPing() {
    return this.appService.neo4jPing();
  }
}
