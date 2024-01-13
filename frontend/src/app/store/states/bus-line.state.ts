import { EntityState } from "@ngrx/entity";
import { BusLine } from "../../bus-line/bus-line.model";

export interface BusLineState extends EntityState<BusLine> {
    selectedBusLineId: number | null;
    loading: boolean;
    error: string;
    sortAscending: boolean;
    sortingCriteria: string;
    searchText: string;
}