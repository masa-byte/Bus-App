import { createAction, props } from "@ngrx/store";
import { Town } from "../../town/town.model";

export const getTown = createAction('[Town] Get Town', props<{ id: string }>());

export const loadTowns = createAction('[Town] Load Towns');

export const loadTownsSuccess = createAction('[Town] Load Towns Success', props<{ towns: Town[] }>());

export const loadTownsFailure = createAction('[Town] Load Towns Failure', props<{ error: string }>());

export const selectTown = createAction('[Town] Select Town', props<{ id: number }>());