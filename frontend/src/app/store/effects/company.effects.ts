import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as CompanyActions from '../actions/company.actions';
import { CompanyUser } from '../../user/company-user.model';
import { CompanyService } from '../../company/company.service';

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
                            const gradeNumber = company.gradeNumber;
                            const gradeSum = company.gradeSum;
                            return {
                                id: company.id,
                                email: company.email,
                                name: company.name,
                                phone: company.phone,
                                type: company.type,
                                yearEstablished: company.yearEstablished,
                                rating: gradeNumber == 0 ? 0 : gradeSum / gradeNumber
                            };
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
                        let company: CompanyUser = {
                            id: body.id,
                            email: body.email,
                            name: body.name,
                            phone: body.phone,
                            type: body.type,
                            yearEstablished: body.yearEstablished,
                            rating: body.rating
                        };

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