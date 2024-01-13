import { createAction, props } from "@ngrx/store";
import { BusLine } from "../../bus-line/bus-line.model";
import { Town } from "../../town/town.model";

export const getBusLine = createAction('[BusLine] Get BusLine', props<{ id: string }>());

export const addBusLine = createAction('[BusLine] Add BusLine', props<{ busLine: BusLine }>());

export const addBusLineSuccess = createAction('[BusLine] Add BusLine Success', props<{ busLine: BusLine }>());

export const addBusLineFailure = createAction('[BusLine] Add BusLine Failure', props<{ error: string }>());

export const deleteBusLine = createAction('[BusLine] Delete BusLine', props<{ id: string }>());

export const deleteBusLineSuccess = createAction('[BusLine] Delete BusLine Success', props<{ id: string }>());

export const deleteBusLineFailure = createAction('[BusLine] Delete BusLine Failure', props<{ error: string }>());

export const loadBusLinesByStartDestEndDest = createAction('[BusLine] Load BusLines', props<{ startDest: Town, endDest: Town }>());

export const loadBusLinesSuccess = createAction('[BusLine] Load BusLines Success', props<{ busLine: BusLine[] }>());

export const loadBusLinesFailure = createAction('[BusLine] Load BusLines Failure', props<{ error: string }>());

export const selectBusLine = createAction('[BusLine] Select BusLine', props<{ id: number }>());

export const clearBusLineError = createAction('[BusLine] Clear Error');

export const sortBusLines = createAction(
    '[BusLine] Sort BusLines',
    props<{ sortingCriteria: string; sortAscending: boolean, searchText: string }>()
);