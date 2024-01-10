import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/my-neo4j/neo4j.service';
import { User } from './user.entity';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class UserService {

    constructor(private readonly neo4jService: Neo4jService) { }

    async getAllUsers(): Promise<User[]> {
        const res = await this.neo4jService.read(`MATCH (n:User) RETURN n`)
        if (res.records.length === 0) {
            return []
        }
        return res.records.map(record => this.mapNeo4jNodeToUser(record.get('n')))
    }

    async getUserById(id: string): Promise<User> {
        const res = await this.neo4jService.read(`MATCH (n:User) WHERE id(n) = ${id} RETURN n`)
        if (res.records.length === 0) {
            return null
        }
        return this.mapNeo4jNodeToUser(res.records[0].get('n'))
    }

    async getUserByEmail(email: string): Promise<User> {
        const res = await this.neo4jService.read(`MATCH (n:User) WHERE n.email = '${email}' RETURN n`)
        if (res.records.length === 0) {
            return null
        }
        return this.mapNeo4jNodeToUser(res.records[0].get('n'))
    }

    async createUser(user: any): Promise<User> {
        let userToCreate = {
            ...user,
            dateCreated: new Date().toISOString(),
        };
        const res = await this.neo4jService.write(`CREATE (n:User $userToCreate) RETURN n`, { userToCreate })
        return this.mapNeo4jNodeToUser(res.records[0].get('n'))
    }

    async createCompany(company: User): Promise<User> {
        let user = new User();
        await user.setPassword(company.password);
        company.password = user.password;
        company.id = null;
        let companyToCreate = {
            ...company,
            dateCreated: new Date().toISOString(),
        };
        
        const res = await this.neo4jService.write(`CREATE (n:Company $companyToCreate) RETURN n`, { companyToCreate })
        return this.mapNeo4jNodeToUser(res.records[0].get('n'))
    }

    async deleteUser(id: string) {
        const res = await this.neo4jService.write(`MATCH (n:User) WHERE id(n) = ${id} DELETE n`)
        return
    }

    async updateUser(user: any): Promise<User> {
        const { id, ...rest } = user
        const res = await this.neo4jService.write(`MATCH (n:User) WHERE id(n) = ${id} SET n += $rest RETURN n`, { id, rest })
        return this.mapNeo4jNodeToUser(res.records[0].get('n'))
    }

    async comparePassword(password: string, id: string): Promise<boolean> {
        const res = await this.neo4jService.read(`MATCH (n:User) WHERE id(n) = ${id} RETURN n`)
        if (res.records.length === 0) {
            return false
        }
        const user = this.mapNeo4jNodeToUser(res.records[0].get('n'))
        return await user.comparePassword(password);
    }

    private mapNeo4jNodeToUser(node: any): User {
        const user = new User();
        user.id = node.identity.toString();
        user.name = node.properties.name;
        user.surname = node.properties.surname;
        user.email = node.properties.email;
        user.password = node.properties.password;
        user.phone = node.properties.phone;
        user.type = node.properties.type;
        user.birthDate = node.properties.birthDate;
        user.createdAt = node.properties.createdAt;
        return user;
    }
}
