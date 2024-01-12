import { Field, ID, ObjectType } from "@nestjs/graphql";
import * as bcrypt from 'bcrypt';

@ObjectType('CompanyUser')
export class CompanyUser {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    phone: string;

    @Field()
    type: string;

    @Field()
    yearEstablished: number;

    @Field()
    gradeNumber: number;

    @Field()
    gradeSum: number;

    async setPassword(password: string): Promise<void> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        this.password = hashedPassword;
    }

    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}