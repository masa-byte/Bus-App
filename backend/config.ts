
import { Neo4jScheme } from "nest-neo4j/dist";

// Neo4j

export const neo4jUrl = 'neo4j://localhost:7687';

interface Neo4jConfig {
    scheme: Neo4jScheme;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export const neo4jConfig: Neo4jConfig = {
    scheme: 'neo4j',
    host: 'localhost',
    port: 7687,
    username: 'neo4j',
    password: 'neo4j',
    database: 'neo4j'
};