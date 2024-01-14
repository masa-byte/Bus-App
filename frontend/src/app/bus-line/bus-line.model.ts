import { Town } from "../town/town.model";

export interface BusLine {
    id: string;
    companyId: string;
    companyName: string;
    stops: Town[];
}