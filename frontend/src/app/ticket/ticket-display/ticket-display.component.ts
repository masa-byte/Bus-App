import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatDuration } from '../../utility/utility';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket-display',
  templateUrl: './ticket-display.component.html',
  styleUrl: './ticket-display.component.scss'
})
export class TicketDisplayComponent {

  @Input() ticket!: Ticket | undefined;
  @Output() ticketRateRequest = new EventEmitter<string>();

  constructor() { }
  rateCompany() {
    let a = new Date(this.ticket!.departureDate);
    let b = new Date();

    if (a > b)
      this.ticketRateRequest.emit("-1");
    else
      this.ticketRateRequest.emit(this.ticket!.id);
  }

  _formatDuration(durationInMinutes: number): string {
    return formatDuration(durationInMinutes);
  }
}
