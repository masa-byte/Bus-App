import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { Neo4jService } from './my-neo4j/neo4j.service';

@Injectable()
export class AppService {
  constructor(
    private readonly redisService: RedisService,
    private readonly neo4jService: Neo4jService,
  ) { }

  redisPing() {
    return this.redisService.ping();
  }

  async neo4jPing() {
    const res = await this.neo4jService.read(`MATCH (n) RETURN count(n) AS count`)
    return `There are ${res.records[0].get('count')} nodes in the database`
  }
}
