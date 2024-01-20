import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TicketState } from "../states/ticket.state";
import { ticketAdapter } from "../reducers/ticket.reducer";

export const selectTicketState = createFeatureSelector<TicketState>('tickets');

export const {
    selectAll: selectAllTickets,
    selectEntities: selectTicketEntities,
    selectIds: selectTicketIds,
} = ticketAdapter.getSelectors(selectTicketState);

export const selectSelectedTicketId = createSelector(
    selectTicketState,
    (state) => state.selectedTicketId
);

export const selectTotalNumberOfTicketsForUserId = createSelector(
    selectTicketState,
    (state) => state.totalNumberOfTicketsForUserId
);

export const selectTicketLoading = createSelector(
    selectTicketState,
    (state) => state.loading
);

export const selectTicketError = createSelector(
    selectTicketState,
    (state) => state.error
);

export const selectSelectedTicket = createSelector(
    selectTicketEntities,
    selectSelectedTicketId,
    (ticketEntities, selectedTicketId) => ticketEntities[selectedTicketId!]
);