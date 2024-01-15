import { ObjectType, Field, ID } from "@nestjs/graphql";


@ObjectType('Ticket')
export class Ticket {
    @Field(() => ID)
    id: string;

    @Field()
    userId: string;

    @Field()
    busLineId: string;

    @Field()
    departureDate: Date;

    @Field()
    price: number;

    @Field()
    durationMinutes: number;

    @Field()
    distance: number;

    @Field()
    startTownName: string;

    @Field()
    endTownName: string;

    @Field()
    companyName: string;
}