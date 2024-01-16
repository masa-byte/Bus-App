import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as BusLineActions from '../actions/bus-line.actions';
import { BusLine } from '../../bus-line/bus-line.model';
import { BusLineService } from '../../bus-line/bus-line.service';
import { mapToBusLine, mapToBusLineDepartureTimes } from '../../utility/utility';
import { BusLineDepartureTimes } from '../../bus-line/bus-line-departure-times.model';

@Injectable()
export class BusLineEffects {
    constructor(
        private actions$: Actions,
        private busLineService: BusLineService
    ) { }

    loadTotalNumberOfBusLines$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusLineActions.loadTotalNumberOfBusLinesByStartDestEndDest),
            switchMap(({ startDestId, endDestId }) =>
                this.busLineService.getTotalNumberOfBusLinesByStartDestEndDest(startDestId, endDestId).pipe(
                    map((response) => {
                        let body = response.body;
                        let totalNumberOfBusLines: number = body;

                        return BusLineActions.loadTotalNumberOfBusLinesSuccess({ totalNumberOfBusLinesStartDestEndDest: totalNumberOfBusLines });
                    }),
                    catchError((error) => {
                        return of(BusLineActions.loadTotalNumberOfBusLinesFailure({ error: 'Failed to load total number of busLines' }));
                    })
                )
            )
        )
    );

    loadBusLinesByStartDestEndDestPageIndexPageSize$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusLineActions.loadBusLinesByStartDestEndDestPageIndexPageSize),
            switchMap(({ startDestId, endDestId, pageIndex, pageSize }) =>
                this.busLineService.getBusLinesByStartDestEndDestPageIndexPageSize(startDestId, endDestId, pageIndex, pageSize).pipe(
                    map((response) => {
                        let body = response.body;
                        let id: string = '0';
                        let allBusLines: BusLine[] = body.map((busLine: BusLine) => {
                            busLine.id = id;
                            id = +id + 1 + '';
                            return mapToBusLine(busLine)
                        });

                        return BusLineActions.loadBusLinesSuccess({ busLine: allBusLines });
                    }),
                    catchError((error) => {
                        return of(BusLineActions.loadBusLinesFailure({ error: 'Failed to load busLines' }));
                    })
                )
            )
        )
    );

    loadBusLineIdsForCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusLineActions.loadBusLineIdsForCompany),
            switchMap(({ companyId }) =>
                this.busLineService.getBusLineIdsForCompany(companyId).pipe(
                    map((response) => {
                        let body = response.body;
                        let companyBusLineIds: string[] = body;

                        return BusLineActions.loadBusLineIdsForCompanySuccess({ companyBusLineIds: companyBusLineIds });
                    }),
                    catchError((error) => {
                        return of(BusLineActions.loadBusLineIdsForCompanyFailure({ error: 'Failed to load busLineIds for company' }));
                    })
                )
            )
        )
    );


    addBusLine$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusLineActions.addBusLine),
            switchMap(({ busLine }) =>
                this.busLineService.createBusLine(busLine).pipe(
                    map((response) => {
                        let body = response.body;
                        let busLine: BusLine = mapToBusLine(body);

                        return BusLineActions.addBusLineSuccess({ busLine: busLine });
                    }),
                    catchError((error) => {
                        return of(BusLineActions.addBusLineFailure({ error: 'Failed to add busLine' }));
                    })
                )
            )
        )
    );

    addBusLineDepartureTimes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusLineActions.addBusLineDepartureTimes),
            switchMap(({ busLineDepartureTimes }) =>
                this.busLineService.createBusLineDepartureTimes(busLineDepartureTimes).pipe(
                    map((response) => {
                        let body = response.body;
                        let busLineDepartureTimes: BusLineDepartureTimes = mapToBusLineDepartureTimes(body);

                        return BusLineActions.addBusLineDepartureTimesSuccess({ busLineDepartureTimes: busLineDepartureTimes });
                    }),
                    catchError((error) => {
                        return of(BusLineActions.addBusLineDepartureTimesFailure({ error: 'Failed to add busLine departure times' }));
                    })
                )
            )
        )
    );

    deleteBusLine$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusLineActions.deleteBusLine),
            switchMap(({ id, busLineId, companyId }) =>
                this.busLineService.deleteBusLine(busLineId, companyId).pipe(
                    map((response) => {
                        return BusLineActions.deleteBusLineSuccess({ id: id });
                    }),
                    catchError((error) => {
                        return of(BusLineActions.deleteBusLineFailure({ error: 'Failed to delete busLine' }));
                    })
                )
            )
        )
    );
}