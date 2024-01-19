import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/redis.module';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [RedisModule],
  controllers: [VehiclesController],
  providers: [VehiclesService]
})
export class VehiclesModule {}
