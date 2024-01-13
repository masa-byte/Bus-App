import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Town')
export class Town {

    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    latitude: number;

    @Field()
    longitude: number;

    @Field()
    population: number;
}