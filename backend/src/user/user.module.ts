import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MyNeo4jModule } from 'src/my-neo4j/my-neo4j.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    MyNeo4jModule
  ],
  controllers: [UserController],
  providers: [UserResolver]
})
export class UserModule {}
