import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as TownActions from '../actions/town.actions';
import { TownService } from '../../town/town.service';
import { Town } from '../../town/town.model';

@Injectable()
export class TownEffects {
    constructor(
        private actions$: Actions,
        private townService: TownService
    ) { }

    loadTowns$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TownActions.loadTowns),
            switchMap(() =>
                this.townService.getAllTowns().pipe(
                    map((response) => {
                        let body = response.body;
                        let allTowns: Town[] = body.map((town: Town) => {
                            return {
                                id: town.id,
                                name: town.name,
                                population: town.population,
                                latitude: town.latitude,
                                longitude: town.longitude,
                            };
                        });

                        return TownActions.loadTownsSuccess({ towns: allTowns });
                    }),
                    catchError((error) => {
                        return of(TownActions.loadTownsFailure({ error: 'Failed to load towns' }));
                    })
                )
            )
        )
    );
}