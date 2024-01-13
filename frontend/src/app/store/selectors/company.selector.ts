import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CompanyState } from "../states/company.state";
import { companyAdapter } from "../reducers/company.reducer";

export const selectCompanyState = createFeatureSelector<CompanyState>('companies');

export const {
    selectAll: selectAllCompany,
    selectEntities: selectCompanyEntities,
    selectIds: selectCompanyIds,
} = companyAdapter.getSelectors(selectCompanyState);

export const selectSelectedCompanyId = createSelector(
    selectCompanyState,
    (state) => state.selectedCompanyId
);

export const selectTotalNumberOfCompanies = createSelector(
    selectCompanyState,
    (state) => state.totalNumberOfCompanies
);

export const selectCompanyLoading = createSelector(
    selectCompanyState,
    (state) => state.loading
);

export const selectCompanyError = createSelector(
    selectCompanyState,
    (state) => state.error
);

export const selectSelectedCompany = createSelector(
    selectCompanyEntities,
    selectSelectedCompanyId,
    (companyEntities, selectedCompanyId) => companyEntities[selectedCompanyId!]
);

export const selectSortingCriteria = createSelector(
    selectCompanyState,
    (state) => state.sortingCriteria
);

export const selectSortAscending = createSelector(
    selectCompanyState,
    (state) => state.sortAscending
);

export const selectSearchText = createSelector(
    selectCompanyState,
    (state) => state.searchText
);

export const selectFilteredCompanies = createSelector(
    selectCompanyEntities,
    selectSortingCriteria,
    selectSortAscending,
    selectSearchText,
    (entities, sorting, ascending, searchText) => {
        let arrayOfCompanies = Object.values(entities!);

        if (searchText !== '')
            arrayOfCompanies = arrayOfCompanies.filter((company: any) => company.name.toLowerCase().includes(searchText.toLowerCase()));

        if (sorting === 'noCriteria')
            return arrayOfCompanies;

        return arrayOfCompanies.sort((a: any, b: any) => {
            if (ascending)
                return a[sorting] - b[sorting];
            else
                return b[sorting] - a[sorting];
        });
    }
);