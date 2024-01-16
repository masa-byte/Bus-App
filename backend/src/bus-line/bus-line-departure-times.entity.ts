import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType('BusLineDepartureTimes')
export class BusLineDepartureTimes {
    @Field(() => ID)
    id: string;

    @Field()
    busLineId: string;

    @Field()
    companyId: string;

    @Field()
    companyName: string;

    @Field(() => [Number])
    capacities: number[];

    @Field(() => [String])
    departureTimes: string[];
}