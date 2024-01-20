import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import * as TicketActions from '../actions/ticket.actions';
import { Ticket } from "../../ticket/ticket.model";
import { TicketState } from "../states/ticket.state";

export const ticketAdapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>();

export const initialState: TicketState = ticketAdapter.getInitialState({
    totalNumberOfTicketsForUserId: 0,
    selectedTicketId: null,
    loading: false,
    error: ''
});

export const ticketReducer = createReducer(
    initialState,
    on(TicketActions.loadTotalNumberOfTicketsForUserIdSuccess, (state, { totalNumberOfTicketsForUserId }) => {
        return {
            ...state,
            totalNumberOfTicketsForUserId: totalNumberOfTicketsForUserId,
            loading: false,
            error: ''
        };
    }),
    on(TicketActions.loadTotalNumberOfTicketsForUserIdFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(TicketActions.loadTicketsByUserIdPageIndexPageSizeSuccess, (state, { tickets }) => {
        return ticketAdapter.setAll(tickets, state);
    }),
    on(TicketActions.loadTicketsByUserIdPageIndexPageSizeFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(TicketActions.rateCompanySuccess, (state, { ticketId, rating }) => {
        return ticketAdapter.removeOne(ticketId, state);
    }),
    on(TicketActions.rateCompanyFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    })
);