import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MyNeo4jModule } from 'src/my-neo4j/my-neo4j.module';
import { UserService } from './user.service';
import { UtilityModule } from 'src/utility/utility.module';

@Module({
  imports: [
    MyNeo4jModule,
    UtilityModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
