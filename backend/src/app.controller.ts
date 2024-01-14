import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval, map } from 'rxjs';

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
 
  @Sse('sse')
  sse(): Observable<any> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }

}
