import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Result, Session, session } from 'neo4j-driver';
import neo4j from 'neo4j-driver';
import { neo4jUrl, neo4jConfig } from 'config';
import { SpecificDepartureTime } from 'src/bus-line/specific-departure-time.entity';

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
        //this.makeSpecificDatesForTimeTables();
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
                const price = Math.round(parseFloat(distance) * 5);
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

    async makeSpecificDatesForTimeTables(departureTimesid: string = null) {
        await this.deleteSpecificDatesForTimeTablesWhichAreOld(departureTimesid);
        const session = this.getWriteSession();
        let res;
        if (departureTimesid) {
            res = await session.run(`MATCH (n:DepartureTimes) WHERE ID(n) = ${departureTimesid} RETURN n`, {});
        }
        else {
            res = await session.run(`MATCH (n:DepartureTimes) RETURN n`, {});
        }
        session.close();
        for (const record of res.records) {
            const departureTimes = record.get('n').properties.departureTimes;
            const capacities = record.get('n').properties.capacities;
            const today = new Date();
            const specificDates = [];
            // in specific dates we will save 3 days ahead of today
            for (let i = 0; i < 3; i++) {
                let date = new Date();
                date.setDate(today.getDate() + i + 1);
                const formDate = date.toISOString().split('T')[0];
                specificDates.push(formDate);
            }
            for (const specificDate of specificDates) {
                for (let i = 0; i < departureTimes.length; i++) {
                    const departureTime = new SpecificDepartureTime();
                    departureTime.departureTime = departureTimes[i];
                    departureTime.capacity = capacities[i];

                    const session = this.getWriteSession();
                    const res = await session.run(`CREATE (n:SpecificDepTime $departureTime) RETURN n`, { departureTime });
                    session.close();
                    const depTimeId = res.records[0].get('n').identity.toString();

                    const session2 = this.getWriteSession();
                    await session2.run(`
                    MATCH (n:DepartureTimes) WHERE id(n) = ${record.get('n').identity}
                    MATCH (s:SpecificDepTime) WHERE id(s) = ${depTimeId}
                    CREATE (n)-[:HAS_SPECIFIC_DEPARTURE {date: '${specificDate}'}]->(s)
                    `);
                    session2.close();
                }
            }
        }
    }

    async deleteSpecificDatesForTimeTablesWhichAreOld(departureTimesid: string = null) {
        const session = this.getWriteSession();
        let res
        if (departureTimesid) {
            return;
        }
        else {
            res = await session.run(`MATCH (n:SpecificDepTime)-[r:HAS_SPECIFIC_DEPARTURE]-() RETURN r`, {});
        }
        session.close();
        for (const record of res.records) {
            const date = record.get('r').properties.date;
            const today = new Date();
            const specificDate = new Date(date);
            if (specificDate < today) {
                const session = this.getWriteSession();
                await session.run(`MATCH (n:SpecificDepTime)-[r:HAS_SPECIFIC_DEPARTURE {date: ${date}}]-() delete n, r`, {});
                session.close();
            }
        }
    }
}
