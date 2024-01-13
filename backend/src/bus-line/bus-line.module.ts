import { Module } from '@nestjs/common';
import { BusLineService } from './bus-line.service';
import { BusLineController } from './bus-line.controller';
import { MyNeo4jModule } from 'src/my-neo4j/my-neo4j.module';
import { UtilityModule } from 'src/utility/utility.module';

@Module({
  imports: [
    MyNeo4jModule,
    UtilityModule
  ],
  providers: [BusLineService],
  controllers: [BusLineController]
})
export class BusLineModule {}
