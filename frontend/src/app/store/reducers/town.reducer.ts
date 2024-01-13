import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { TownState } from "../states/town.state";
import { createReducer, on } from "@ngrx/store";
import * as TownActions from '../actions/town.actions';
import { Town } from "../../town/town.model";

export const townAdapter: EntityAdapter<Town> = createEntityAdapter<Town>();

export const initialState: TownState = townAdapter.getInitialState({
    selectedTownId: null,
    loading: false,
    error: ''
});

export const townReducer = createReducer(
    initialState,
    on(TownActions.loadTowns, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(TownActions.loadTownsSuccess, (state, { towns }) => {
        return townAdapter.setAll(towns, {
            ...state,
            loading: false
        });
    }),
    on(TownActions.loadTownsFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),
    on(TownActions.selectTown, (state, { id }) => {
        return {
            ...state,
            selectedTownId: id
        };
    })
);