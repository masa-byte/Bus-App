import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { BusLine } from "../../bus-line/bus-line.model";
import { BusLineState } from "../states/bus-line.state";
import * as BusLineActions from '../actions/bus-line.actions';

export const busLineAdapter: EntityAdapter<BusLine> = createEntityAdapter<BusLine>();

export const initialState: BusLineState = busLineAdapter.getInitialState({
    selectedBusLineId: null,
    loading: false,
    error: '',
    sortAscending: true,
    sortingCriteria: 'noCriteria',
    typeFiler: [],
    searchText: ''
});

export const busLineReducer = createReducer(
    initialState,
    on(BusLineActions.addBusLineSuccess, (state, { busLine }) => {
        return busLineAdapter.addOne(busLine, state);
    }),
    on(BusLineActions.addBusLineFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(BusLineActions.deleteBusLineSuccess, (state, { id }) => {
        return busLineAdapter.removeOne(id, state);
    }),
    on(BusLineActions.deleteBusLineFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(BusLineActions.loadBusLinesByStartDestEndDest, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(BusLineActions.loadBusLinesSuccess, (state, { busLine }) => {
        return busLineAdapter.setAll(busLine, {
            ...state,
            loading: false
        });
    }),
    on(BusLineActions.loadBusLinesFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),
    on(BusLineActions.selectBusLine, (state, { id }) => {
        return {
            ...state,
            selectedBusLineId: id
        };
    }),
    on(BusLineActions.clearBusLineError, (state) => {
        return {
            ...state,
            error: ''
        };
    }),
    on(BusLineActions.sortBusLines, (state, { sortingCriteria, sortAscending, searchText }) => {
        return {
            ...state,
            sortingCriteria: sortingCriteria,
            sortAscending: sortAscending,
            searchText: searchText
        };
    }),
);