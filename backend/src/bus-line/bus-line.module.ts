import { Module } from '@nestjs/common';
import { BusLineService } from './bus-line.service';
import { BusLineController } from './bus-line.controller';
import { MyNeo4jModule } from 'src/my-neo4j/my-neo4j.module';

@Module({
  imports: [
    MyNeo4jModule,
  ],
  providers: [BusLineService],
  controllers: [BusLineController],
  exports: [BusLineService]
})
export class BusLineModule {}
