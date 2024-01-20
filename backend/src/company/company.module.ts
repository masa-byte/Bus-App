import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MyNeo4jModule } from 'src/my-neo4j/my-neo4j.module';
import { BusLineModule } from 'src/bus-line/bus-line.module';

@Module({
  imports: [
    MyNeo4jModule,
    BusLineModule
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService]
})
export class CompanyModule {}
