import { createAction, props } from "@ngrx/store";
import { CompanyUser } from "../../user/company-user.model";

export const getCompany = createAction('[Company] Get Company', props<{ id: number }>());

export const loadCompaniesByPageIndexPageSize = createAction
    (
        '[Company] Load Companies',
        props<{ pageIndex: number, pageSize: number }>()
    );

export const loadTotalNumberOfCompanies = createAction('[Company] Load Total Number Of Companies');

export const loadTotalNumberOfCompaniesSuccess = createAction('[Company] Load Total Number Of Companies Success', props<{ totalNumberOfCompanies: number }>());

export const loadTotalNumberOfCompaniesFailure = createAction('[Company] Load Total Number Of Companies Failure', props<{ error: string }>());

export const loadCompaniesSuccess = createAction('[Company] Load Companies Success', props<{ company: CompanyUser[] }>());

export const loadCompaniesFailure = createAction('[Company] Load Companies Failure', props<{ error: string }>());

export const createCompanyUser = createAction('[User] Create Company User', props<{ company: CompanyUser }>());

export const createCompanyUserSuccess = createAction('[User] Create Company User Success', props<{ company: CompanyUser }>());

export const createCompanyUserFailure = createAction('[User] Create Company User Failure', props<{ error: string }>());

export const deleteCompany = createAction('[Company] Delete Company', props<{ id: string }>());

export const deleteCompanySuccess = createAction('[Company] Delete Company Success', props<{ id: string }>());

export const deleteCompanyFailure = createAction('[Company] Delete Company Failure', props<{ error: string }>());

export const selectCompany = createAction('[Company] Select Company', props<{ id: number }>());

export const clearCompanyError = createAction('[Company] Clear Error');

export const sortCompanies = createAction(
    '[Company] Sort Companies',
    props<{ sortingCriteria: string; sortAscending: boolean, searchText: string }>()
);

export const rateCompany = createAction('[Company] Rate Company', props<{ id: string, rating: number }>());

export const rateCompanySuccess = createAction('[Company] Rate Company Success', props<{ company: CompanyUser }>());

export const rateCompanyFailure = createAction('[Company] Rate Company Failure', props<{ error: string }>());