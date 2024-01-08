import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Result, Session, session } from 'neo4j-driver';
import neo4j from 'neo4j-driver';
import { neo4jUrl, neo4jConfig } from 'config';

@Injectable()
export class Neo4jService implements OnModuleDestroy {
    private readonly driver;

    constructor() {
        this.driver = neo4j.driver(
            neo4jUrl,
            neo4j.auth.basic("", ""),
        );
    }
    
    onModuleDestroy() {
        this.driver.close();
    }

    getReadSession(): Session {
        return this.driver.session({
            database: neo4jConfig.database,
            defaultAccessMode: session.READ,
        });
    }

    getWriteSession(): Session {
        return this.driver.session({
            database: neo4jConfig.database,
            defaultAccessMode: session.WRITE,
        })
    }

    read(cypher: string, params?: Record<string, any>): Result {
        const session = this.getReadSession()
        return session.run(cypher, params)
    }

    write(cypher: string, params?: Record<string, any>): Result {
        const session = this.getWriteSession()
        return session.run(cypher, params)
    }
}
