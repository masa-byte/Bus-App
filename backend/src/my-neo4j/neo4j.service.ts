import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Result, Session, session } from 'neo4j-driver';
import neo4j from 'neo4j-driver';
import { neo4jUrl, neo4jConfig } from 'config';

@Injectable()
export class Neo4jService implements OnModuleDestroy, OnModuleInit {
    private readonly driver;

    constructor() {
        this.driver = neo4j.driver(
            neo4jUrl,
            neo4j.auth.basic("", ""),
        );
    }

    onModuleInit() {
        this.getTownsInSerbia();
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
        const session = this.getReadSession();
        return session.run(cypher, params);
    }

    write(cypher: string, params?: Record<string, any>): Result {
        const session = this.getWriteSession();
        return session.run(cypher, params);
    }

    // on inital load

    private async getTownsInSerbia() {
        const session = this.getWriteSession();
        const res = await session.run(`MATCH (n:Town) RETURN COUNT(n) AS count`, {});
        session.close();
        if (res.records[0].get('count') == 0) {
            await this.loadTownsInSerbia();
            console.log('Towns in Serbia loaded');
        }
    }

    private async loadTownsInSerbia() {
        const path = require('node:path');
        const fs = require('node:fs');
        const citiesFilePath = path.join(__dirname, '..', '..', '..', 'towns-serbia.json');
        const citiesData = JSON.parse(fs.readFileSync(citiesFilePath, 'utf8'));

        for (const cityData of citiesData) {
            const city = {
                name: cityData.city,
                latitude: cityData.lat,
                longitude: cityData.lng,
                population: cityData.population,
                createdAt: new Date().toISOString(),
            }
            const session = this.getWriteSession();
            await session.run(`CREATE (n:Town $city)`, { city })
            session.close();
        }

        for (let i = 0; i < citiesData.length - 1; i++) {
            for (let j = i + 1; j < citiesData.length; j++) {
                const city1 = citiesData[i];
                const city2 = citiesData[j];

                const distance = this.calculateDistance(
                    parseFloat(city1.lat),
                    parseFloat(city1.lng),
                    parseFloat(city2.lat),
                    parseFloat(city2.lng)
                );
                const price = Math.round(parseFloat(distance) * 3);
                console.log(`${city1.city} - ${city2.city} = ${distance} km = ${price} RSD`)
                const session = this.getWriteSession();
                await session.run(`
                MATCH (c1:Town {name: $city1})
                MATCH (c2:Town {name: $city2})
                CREATE (c1)-[:CONNECTS {km: $distance, price: $price}]->(c2)
              `, { city1: city1.city, city2: city2.city, distance, price })
                session.close();
            }
        }
    }

    private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371; // km
        const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // in km
        return distance.toPrecision(4);
    }
}
