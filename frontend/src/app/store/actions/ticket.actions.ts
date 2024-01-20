import { createAction, props } from "@ngrx/store";

export const loadTotalNumberOfTicketsForUserId = createAction(
    '[Ticket] Load Total Number Of Tickets For User Id',
    props<{ userId: string }>()
);

export const loadTotalNumberOfTicketsForUserIdSuccess = createAction(
    '[Ticket] Load Total Number Of Tickets For User Id Success',
    props<{ totalNumberOfTicketsForUserId: number }>()
);

export const loadTotalNumberOfTicketsForUserIdFailure = createAction(
    '[Ticket] Load Total Number Of Tickets For User Id Failure',
    props<{ error: string }>()
);

export const loadTicketsByUserIdPageIndexPageSize = createAction(
    '[Ticket] Load Tickets By User Id Page Index Page Size',
    props<{ userId: string, pageIndex: number, pageSize: number }>()
);

export const loadTicketsByUserIdPageIndexPageSizeSuccess = createAction(
    '[Ticket] Load Tickets By User Id Page Index Page Size Success',
    props<{ tickets: any }>()
);

export const loadTicketsByUserIdPageIndexPageSizeFailure = createAction(
    '[Ticket] Load Tickets By User Id Page Index Page Size Failure',
    props<{ error: string }>()
);

export const rateCompany = createAction(
    '[Ticket] Rate Company',
    props<{ ticketId: string, rating: number }>()
);

export const rateCompanySuccess = createAction(
    '[Ticket] Rate Company Success',
    props<{ ticketId: string, rating: number }>()
);

export const rateCompanyFailure = createAction(
    '[Ticket] Rate Company Failure',
    props<{ error: string }>()
);

export const clearTickets = createAction(
    '[Ticket] Clear Tickets'
);