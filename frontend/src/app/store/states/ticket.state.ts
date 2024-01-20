import { EntityState } from "@ngrx/entity";
import { Ticket } from "../../ticket/ticket.model";

export interface TicketState extends EntityState<Ticket> {
    totalNumberOfTicketsForUserId: number;
    selectedTicketId: string | null;
    loading: boolean;
    error: string;
}