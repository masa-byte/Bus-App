import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType('SpecificDepartureTime')
export class SpecificDepartureTime {
    @Field(() => ID)
    id: string;

    @Field()
    departureTime: string;

    @Field()
    capacity: number;
}