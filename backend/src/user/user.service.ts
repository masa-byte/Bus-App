import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/my-neo4j/neo4j.service';
import { Role } from 'src/auth/enums/role.enum';
import { RegularUser } from './regular-user.entity';
import { CompanyUser } from './company-user.entity';
import { mapNeo4jNodeToRegularUser, mapNeo4jNodeToUser } from 'src/utility/utility';

@Injectable()
export class UserService {

    constructor(
        private readonly neo4jService: Neo4jService,
    ) { }

    async getAllUsers(): Promise<RegularUser[]> {
        const res = await this.neo4jService.read(`MATCH (n:User) RETURN n`)
        if (res.records.length === 0) {
            return []
        }
        return res.records.map(record => mapNeo4jNodeToRegularUser(record.get('n')))
    }

    async getUserById(id: string): Promise<RegularUser | CompanyUser> {
        const res = await this.neo4jService.read(`MATCH (n) WHERE id(n) = ${id} RETURN n`)
        if (res.records.length === 0) {
            return null
        }
        return mapNeo4jNodeToUser(res.records[0].get('n'))
    }

    async getUserByEmail(email: string): Promise<RegularUser | CompanyUser> {
        const res = await this.neo4jService.read(`MATCH (n) WHERE n.email = '${email}' RETURN n`)
        if (res.records.length === 0) {
            return null
        }
        return mapNeo4jNodeToUser(res.records[0].get('n'))
    }

    async createUser(user: any): Promise<RegularUser> {
        user.type = Role.User;
        let userToCreate = {
            ...user,
            dateCreated: new Date().toISOString(),
        };
        const res = await this.neo4jService.write(`CREATE (n:User $userToCreate) RETURN n`, { userToCreate })
        return mapNeo4jNodeToRegularUser(res.records[0].get('n'))
    }

    async deleteUser(id: string) {
        // soft delete
        const res = await this.neo4jService.write(`MATCH (n:User) WHERE id(n) = ${id} SET n.deleted = true RETURN n`)
        return
    }

    async updateUser(user: any): Promise<RegularUser | CompanyUser> {
        const { id, ...rest } = user
        const res = await this.neo4jService.write(`MATCH (n) WHERE id(n) = ${id} SET n += $rest RETURN n`, { rest })
        return mapNeo4jNodeToUser(res.records[0].get('n'))
    }

    async comparePassword(password: string, id: string): Promise<boolean> {
        const res = await this.neo4jService.read(`MATCH (n) WHERE id(n) = ${id} RETURN n`)
        if (res.records.length === 0) {
            return false
        }
        const user = mapNeo4jNodeToUser(res.records[0].get('n'))
        return await user.comparePassword(password);
    }
}
