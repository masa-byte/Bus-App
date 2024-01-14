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
    
    @Field(() => [Town])
    stops: Town[];
}