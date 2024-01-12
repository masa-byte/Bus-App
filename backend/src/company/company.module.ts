import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MyNeo4jModule } from 'src/my-neo4j/my-neo4j.module';
import { UtilityModule } from 'src/utility/utility.module';

@Module({
  imports: [
    MyNeo4jModule,
    UtilityModule
  ],
  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule {}
