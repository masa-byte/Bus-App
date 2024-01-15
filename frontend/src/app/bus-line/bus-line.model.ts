import { Town } from "../town/town.model";

export interface BusLine {
    id: string;
    busLineId: string;
    companyId: string;
    companyName: string;
    stops: Town[];
}