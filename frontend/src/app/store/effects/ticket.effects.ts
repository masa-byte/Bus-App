import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as TicketActions from '../actions/ticket.actions';
import { TicketService } from '../../ticket/ticket.service';
import { mapToTicket } from '../../utility/utility';

@Injectable()
export class TicketEffects {
    constructor(
        private actions$: Actions,
        private ticketService: TicketService
    ) { }

    loadTotalNumberOfTickets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TicketActions.loadTotalNumberOfTicketsForUserId),
            switchMap(({ userId }) =>
                this.ticketService.getTotalNumberOfTicketsForUser(userId).pipe(
                    map((response) => {
                        let body = response.body;
                        let totalNumberOfTickets: number = body;

                        return TicketActions.loadTotalNumberOfTicketsForUserIdSuccess({ totalNumberOfTicketsForUserId: totalNumberOfTickets });
                    }),
                    catchError((error) => {
                        return of(TicketActions.loadTotalNumberOfTicketsForUserIdFailure({ error: 'Failed to load total number of tickets' }));
                    })
                )
            )
        )
    );

    loadTicketsByUserIdPageIndexPageSize$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TicketActions.loadTicketsByUserIdPageIndexPageSize),
            switchMap(({ userId, pageIndex, pageSize }) =>
                this.ticketService.getTickerByUserIdPageIndexPageSize(userId, pageIndex, pageSize).pipe(
                    map((response) => {
                        let body = response.body;
                        let allTickets: any = body.map((ticket: any) => {
                            return mapToTicket(ticket);
                        });

                        return TicketActions.loadTicketsByUserIdPageIndexPageSizeSuccess({ tickets: allTickets });
                    }),
                    catchError((error) => {
                        return of(TicketActions.loadTicketsByUserIdPageIndexPageSizeFailure({ error: 'Failed to load tickets' }));
                    })
                )
            )
        )
    );

    rateCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TicketActions.rateCompany),
            switchMap(({ ticketId, rating }) =>
                this.ticketService.rateCompany(ticketId, rating).pipe(
                    map((response) => {
                        return TicketActions.rateCompanySuccess({ ticketId: ticketId, rating: rating });
                    }),
                    catchError((error) => {
                        return of(TicketActions.rateCompanyFailure({ error: 'Failed to rate company' }));
                    })
                )
            )
        )
    );
}