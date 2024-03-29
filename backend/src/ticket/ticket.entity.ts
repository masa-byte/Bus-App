import { ObjectType, Field, ID } from "@nestjs/graphql";


@ObjectType('Ticket')
export class Ticket {
    @Field(() => ID)
    id: string;

    @Field()
    companyId: string;

    @Field()
    userId: string;

    @Field()
    busLineId: string;

    @Field()
    departureDate: string;

    @Field()
    departureTime: string;

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
    returnTicket: boolean;

    @Field()
    numberOfSeats: number;

    @Field()
    ratedCompany: boolean;
}