import { Field, GraphQLISODateTime, ID, ObjectType } from "@nestjs/graphql";
import * as bcrypt from 'bcrypt';

@ObjectType('User')
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    surname: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    phone: string;

    @Field()
    type: string;

    @Field(() => GraphQLISODateTime)
    dateOfBirth: Date;

    @Field(() => GraphQLISODateTime)
    createdAt: Date;

    async setPassword(password: string): Promise<void> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        this.password = hashedPassword;
    }

    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}