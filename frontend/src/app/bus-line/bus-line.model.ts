import { Town } from "../town/town.model";

export interface BusLine {
    id: string;
    companyId: string;
    companyName: string;
    regularPriceFactor: number;
    returnPriceFactor: number;
    studentDiscount: number;
    seniorDiscount: number;
    groupDiscount: number;
    stops: Town[];
}