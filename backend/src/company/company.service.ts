import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';
import { BusLineService } from 'src/bus-line/bus-line.service';
import { Neo4jService } from 'src/my-neo4j/neo4j.service';
import { CompanyUser } from 'src/user/company-user.entity';
import { mapNeo4jNodeToCompanyUser } from 'src/utility/utility';

@Injectable()
export class CompanyService {

    constructor(
        private readonly neo4jService: Neo4jService,
        private readonly busLineService: BusLineService,
    ) { }

    async getTotalNumberOfCompanies(): Promise<number> {
        const res = await this.neo4jService.read(`MATCH (n:Company) RETURN count(n) AS count`)
        const neo4jInteger = res.records[0].get('count');
        const count = neo4jInteger.toNumber();

        return count;
    }

    async getCompaniesByPageIndexPageSize(pageIndex: number, pageSize: number): Promise<CompanyUser[]> {
        const res = await this.neo4jService.read(`MATCH (n:Company) RETURN n SKIP ${pageIndex * pageSize} LIMIT ${pageSize}`)
        if (res.records.length === 0) {
            return []
        }
        return res.records.map(record => mapNeo4jNodeToCompanyUser(record.get('n'), false))
    }

    async createCompany(company: CompanyUser): Promise<CompanyUser> {
        let user = new CompanyUser();
        await user.setPassword(company.password);
        company.password = user.password;
        company.id = null;
        company.type = Role.Company;
        let companyToCreate = {
            ...company,
            dateCreated: new Date().toISOString(),
            gradeNumber: 0,
            gradeSum: 0,
            nextBusLineId: '0'
        };

        const res = await this.neo4jService.write(`CREATE (n:Company $companyToCreate) RETURN n`, { companyToCreate })
        return mapNeo4jNodeToCompanyUser(res.records[0].get('n'))
    }

    async deleteCompany(id: string) {
        // deleting bus lines first
        const query = `
        MATCH (t1:Town)-[r:BUS_LINE { companyId: '${id}'}]->(t2:Town) 
        return distinct r.busLineId as busLineId
        `;
        const res = await this.neo4jService.read(query)
        const busLineIds = res.records.map(record => record.get('busLineId'))
        for (let i = 0; i < busLineIds.length; i++) {
            await this.busLineService.deleteBusLine(busLineIds[i], id)
        }
        // deleting company
        const res2 = await this.neo4jService.write(`MATCH (n:Company) WHERE id(n) = ${id} DELETE n`)
        return
    }

    async rateCompany(id: string, rating: number): Promise<any> {
        const res = await this.neo4jService.write(`MATCH (n:Company) WHERE id(n) = ${id} SET n.gradeNumber = n.gradeNumber + 1, n.gradeSum = n.gradeSum + ${rating}`)
        if (res.records.length === 0) {
            return null
        }
        return mapNeo4jNodeToCompanyUser(res.records[0].get('n'))
    }
}
