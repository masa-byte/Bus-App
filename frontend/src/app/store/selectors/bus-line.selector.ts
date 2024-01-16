import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BusLineState } from "../states/bus-line.state";
import { busLineAdapter } from "../reducers/bus-line.reducer";

export const selectBusLineState = createFeatureSelector<BusLineState>('busLines');

export const {
    selectAll: selectAllBusLine,
    selectEntities: selectBusLineEntities,
    selectIds: selectBusLineIds,
} = busLineAdapter.getSelectors(selectBusLineState);

export const selectSelectedBusLineId = createSelector(
    selectBusLineState,
    (state) => state.selectedBusLineId
);

export const selectTotalNumberOfBusLines = createSelector(
    selectBusLineState,
    (state) => state.totalNumberOfBusLinesStartDestEndDest
);

export const selectCompanyBusLineIds = createSelector(
    selectBusLineState,
    (state) => state.companyBusLineIds
);

export const selectBusLineLoading = createSelector(
    selectBusLineState,
    (state) => state.loading
);

export const selectBusLineError = createSelector(
    selectBusLineState,
    (state) => state.error
);

export const selectSelectedBusLine = createSelector(
    selectBusLineEntities,
    selectSelectedBusLineId,
    (busLineEntities, selectedBusLineId) => busLineEntities[selectedBusLineId!]
);

export const selectSortingCriteria = createSelector(
    selectBusLineState,
    (state) => state.sortingCriteria
);

export const selectSortAscending = createSelector(
    selectBusLineState,
    (state) => state.sortAscending
);

export const selectSearchText = createSelector(
    selectBusLineState,
    (state) => state.searchText
);

export const selectFilteredBusLines = createSelector(
    selectBusLineEntities,
    selectSortingCriteria,
    selectSortAscending,
    selectSearchText,
    (entities, sorting, ascending, searchText) => {
        let arrayOfBusLines = Object.values(entities!);

        if (searchText !== '') 
            arrayOfBusLines = arrayOfBusLines.filter((busLine: any) => busLine.companyName.toLowerCase().includes(searchText.toLowerCase()));

        if (sorting === 'noCriteria')
            return arrayOfBusLines;

        return arrayOfBusLines.sort((a: any, b: any) => {
            if (ascending)
                return a[sorting] - b[sorting];
            else
                return b[sorting] - a[sorting];
        });
    }
);