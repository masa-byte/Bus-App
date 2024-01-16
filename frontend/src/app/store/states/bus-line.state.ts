import { EntityState } from "@ngrx/entity";
import { BusLine } from "../../bus-line/bus-line.model";

export interface BusLineState extends EntityState<BusLine> {
    selectedBusLineId: string | null;
    totalNumberOfBusLinesStartDestEndDest: number;
    companyBusLineIds: string[];
    loading: boolean;
    error: string;
    sortAscending: boolean;
    sortingCriteria: string;
    searchText: string;
}