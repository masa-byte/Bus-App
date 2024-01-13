import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TownState } from "../states/town.state";
import { townAdapter } from "../reducers/town.reducer";

export const selectTownState = createFeatureSelector<TownState>('towns');

export const {
    selectAll: selectAllTown,
    selectEntities: selectTownEntities,
    selectIds: selectTownIds,
} = townAdapter.getSelectors(selectTownState);

export const selectSelectedTownId = createSelector(
    selectTownState,
    (state) => state.selectedTownId
);

export const selectTownLoading = createSelector(
    selectTownState,
    (state) => state.loading
);

export const selectTownError = createSelector(
    selectTownState,
    (state) => state.error
);

export const selectSelectedTown = createSelector(
    selectTownEntities,
    selectSelectedTownId,
    (townEntities, selectedTownId) => townEntities[selectedTownId!]
);