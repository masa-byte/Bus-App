import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Town } from "src/town/town.entity";

@ObjectType('BusLine')
export class BusLine {
    @Field(() => ID)
    id: string;

    @Field()
    busLineId: string;

    @Field()
    companyId: string;
    
    @Field()
    companyName: string;

    @Field()
    oneWayPrice: number;

    @Field()
    returnPrice: number;

    @Field()
    discount: number;

    @Field()
    distance: number;

    @Field()
    durationMinutes: number;
    
    @Field(() => [Town])
    stops: Town[];
}