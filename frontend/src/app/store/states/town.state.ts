import { EntityState } from "@ngrx/entity";
import { Town } from "../../town/town.model";

export interface TownState extends EntityState<Town> {
    selectedTownId: number | null;
    loading: boolean;
    error: string;
}