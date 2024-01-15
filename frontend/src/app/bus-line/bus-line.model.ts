import { Town } from "../town/town.model";

export interface BusLine {
    id: string;
    busLineId: string;
    companyId: string;
    companyName: string;
    distance: number;
    durationMinutes: number;
    oneWayPrice: number;
    returnPrice: number;
    discount: number;
    stops: Town[];
}