import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/my-neo4j/neo4j.service';
import { CompanyUser } from 'src/user/company-user.entity';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class CompanyService {

    constructor(
        private readonly neo4jService: Neo4jService,
        private readonly utilityService: UtilityService
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
        return res.records.map(record => this.utilityService.mapNeo4jNodeToCompanyUser(record.get('n'), false))
    }

    async deleteCompany(id: string) {
        const res = await this.neo4jService.write(`MATCH (n:Company) WHERE id(n) = ${id} DELETE n`)
        return
    }

    async rateCompany(id: string, rating: number): Promise<any> {
        const res = await this.neo4jService.write(`MATCH (n:Company) WHERE id(n) = ${id} SET n.gradeNumber = n.gradeNumber + 1, n.gradeSum = n.gradeSum + ${rating} RETURN n`)
        if (res.records.length === 0) {
            return null
        }
        return this.utilityService.mapNeo4jNodeToCompanyUser(res.records[0].get('n'))
    }
}
