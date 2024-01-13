import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Town } from "src/town/town.entity";

@ObjectType('BusLine')
export class BusLine {
    @Field(() => ID)
    id: string;

    @Field()
    companyId: string;
    
    @Field()
    companyName: string;
    
    @Field()
    priceFactor: number;
    
    @Field()
    studentDiscount: number;
    
    @Field()
    seniorDiscount: number;
    
    @Field()
    groupDiscount: number;

    @Field(() => [Town])
    stops: Town[];
}