import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as BusLineActions from '../actions/bus-line.actions';
import { BusLine } from '../../bus-line/bus-line.model';
import { BusLineService } from '../../bus-line/bus-line.service';
import { mapToBusLine } from '../../utility/utility';

@Injectable()
export class BusLineEffects {
    constructor(
        private actions$: Actions,
        private busLineService: BusLineService
    ) { }

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

    loadBusLinesByStartDestEndDest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusLineActions.loadBusLinesByStartDestEndDest),
            switchMap(({ startDest, endDest }) =>
                this.busLineService.getBusLinesByStartDestEndDest(startDest, endDest).pipe(
                    map((response) => {
                        let body = response.body;
                        let allBusLines: BusLine[] = body.map((busLine: BusLine) => {
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

    deleteBusLine$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusLineActions.deleteBusLine),
            switchMap(({ id }) =>
                this.busLineService.deleteBusLine(id).pipe(
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