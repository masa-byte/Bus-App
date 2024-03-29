import { Module } from '@nestjs/common';
import { TownService } from './town.service';
import { TownController } from './town.controller';
import { MyNeo4jModule } from 'src/my-neo4j/my-neo4j.module';

@Module({
  imports: [
    MyNeo4jModule,
  ],
  providers: [TownService],
  controllers: [TownController]
})
export class TownModule {}
