import { Field, GraphQLISODateTime, ID, ObjectType } from "@nestjs/graphql";
import * as bcrypt from 'bcrypt';

@ObjectType('RegularUser')
export class RegularUser {
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
    birthDate: Date;

    async setPassword(password: string): Promise<void> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        this.password = hashedPassword;
    }

    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}