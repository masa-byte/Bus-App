import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CompanyUser } from "../../user/company-user.model";
import { CompanyState } from "../states/company.state";
import * as CompanyActions from '../actions/company.actions';

export const companyAdapter: EntityAdapter<CompanyUser> = createEntityAdapter<CompanyUser>();

export const initialState: CompanyState = companyAdapter.getInitialState({
    selectedCompanyId: null,
    totalNumberOfCompanies: 0,
    loading: false,
    error: '',
    sortAscending: true,
    sortingCriteria: 'noCriteria',
    searchText: ''
});

export const companyReducer = createReducer(
    initialState,
    on(CompanyActions.loadTotalNumberOfCompaniesSuccess, (state, { totalNumberOfCompanies }) => {
        return {
            ...state,
            totalNumberOfCompanies: totalNumberOfCompanies
        };
    }),
    on(CompanyActions.loadCompaniesSuccess, (state, { company }) => {
        return companyAdapter.setAll(company, {
            ...state,
            loading: false
        });
    }),
    on(CompanyActions.loadCompaniesFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),
    on(CompanyActions.createCompanyUserSuccess, (state, { company }) => {
        return companyAdapter.addOne(company, state);
    }),
    on(CompanyActions.createCompanyUserFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(CompanyActions.deleteCompanySuccess, (state, { id }) => {
        return companyAdapter.removeOne(id, state);
    }),
    on(CompanyActions.deleteCompanyFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(CompanyActions.selectCompany, (state, { id }) => {
        return {
            ...state,
            selectedCompanyId: id
        };
    }),
    on(CompanyActions.clearCompanyError, (state) => {
        return {
            ...state,
            error: ''
        };
    }),
    on(CompanyActions.sortCompanies, (state, { sortingCriteria, sortAscending, searchText }) => {
        return {
            ...state,
            sortingCriteria: sortingCriteria,
            sortAscending: sortAscending,
            searchText: searchText
        };
    }),
    on(CompanyActions.rateCompanySuccess, (state, { company }) => {
        return companyAdapter.updateOne(
            { id: company.id, changes: { rating: company.rating } },
            state
        );
    }),
    on(CompanyActions.rateCompanyFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    })
);