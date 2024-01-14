import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of, mapTo } from 'rxjs';
import * as CompanyActions from '../actions/company.actions';
import { CompanyUser } from '../../user/company-user.model';
import { CompanyService } from '../../company/company.service';
import { mapToCompanyUser } from '../../utility/utility';

@Injectable()
export class CompanyEffects {
    constructor(
        private actions$: Actions,
        private companyService: CompanyService
    ) { }

    loadTotalNumberOfCompanies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.loadTotalNumberOfCompanies),
            switchMap(() =>
                this.companyService.getTotalNumberOfCompanies().pipe(
                    map((response) => {
                        let body = response.body;
                        let totalNumberOfCompanies: number = body;

                        return CompanyActions.loadTotalNumberOfCompaniesSuccess({ totalNumberOfCompanies: totalNumberOfCompanies });
                    }),
                    catchError((error) => {
                        return of(CompanyActions.loadTotalNumberOfCompaniesFailure({ error: 'Failed to load total number of companies' }));
                    })
                )
            )
        )
    );

    loadCompanies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.loadCompaniesByPageIndexPageSize),
            switchMap(({ pageIndex, pageSize }) =>
                this.companyService.getCompaniesByPageIndexPageNumber(pageIndex, pageSize).pipe(
                    map((response) => {
                        let body = response.body;
                        let allCompanies: CompanyUser[] = body.map((company: any) => {
                            return mapToCompanyUser(company)
                        });

                        return CompanyActions.loadCompaniesSuccess({ company: allCompanies });
                    }),
                    catchError((error) => {
                        return of(CompanyActions.loadCompaniesFailure({ error: 'Failed to load companies' }));
                    })
                )
            )
        )
    );

    createCompanyUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.createCompanyUser),
            switchMap(({ company }) =>
                this.companyService.createCompanyUser(company).pipe(
                    map((response) => {
                        let body = response.body;
                        let company: CompanyUser = mapToCompanyUser(body);
                        return CompanyActions.createCompanyUserSuccess({ company });
                    }),
                    catchError((error) => {
                        return of(CompanyActions.createCompanyUserFailure({ error: 'Failed to create company user' }));
                    })
                )
            )
        ));

    deleteCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.deleteCompany),
            switchMap(({ id }) =>
                this.companyService.deleteCompany(id).pipe(
                    map(() => {
                        return CompanyActions.deleteCompanySuccess({ id: id });
                    }),
                    catchError((error) => {
                        return of(CompanyActions.deleteCompanyFailure({ error: 'Failed to delete company' }));
                    })
                )
            )
        )
    );

    rateCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.rateCompany),
            switchMap(({ id, rating }) =>
                this.companyService.rateCompany(id, rating).pipe(
                    map((response) => {
                        let body = response.body;
                        let company: CompanyUser = mapToCompanyUser(body);

                        return CompanyActions.rateCompanySuccess({ company: company });
                    }),
                    catchError((error) => {
                        return of(CompanyActions.rateCompanyFailure({ error: 'Failed to rate company' }));
                    })
                )
            )
        )
    );
}