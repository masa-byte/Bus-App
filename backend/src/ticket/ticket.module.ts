import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { MyNeo4jModule } from 'src/my-neo4j/my-neo4j.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    MyNeo4jModule,
    CompanyModule
  ],
  providers: [TicketService],
  controllers: [TicketController]
})
export class TicketModule {}
