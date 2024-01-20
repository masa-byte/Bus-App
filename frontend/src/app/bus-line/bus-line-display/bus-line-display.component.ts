import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { BusLine } from '../bus-line.model';
import { Observable, of } from 'rxjs';
import { selectUser } from '../../store/selectors/user.selectors';
import { User } from '../../user/user.model';
import * as BusLineActions from '../../store/actions/bus-line.actions';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from '../../ticket/ticket-dialog/ticket-dialog.component';
import { Ticket } from '../../ticket/ticket.model';
import { formatDuration } from '../../utility/utility';

@Component({
  selector: 'app-bus-line-display',
  templateUrl: './bus-line-display.component.html',
  styleUrl: './bus-line-display.component.scss'
})
export class BusLineDisplayComponent {

  user$: Observable<User | null> = of();
  user: User | null = null;
  @Input() busLine!: BusLine | undefined;
  @Output() busLineDeleteRequest = new EventEmitter<string[]>();
  @Output() ticketReservationRequest = new EventEmitter<Ticket>();

  constructor(
    private router: Router,
    private store: Store,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  buyTicket() {
    this.store.dispatch(BusLineActions.selectBusLine({ id: this.busLine!.id }));
    const dialogRef = this.dialog.open(TicketDialogComponent, {
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const ticket = result as Ticket;
        ticket.userId = this.user!.id;
        this.ticketReservationRequest.emit(ticket);
      }
    });
  }

  deleteBusLine() {
    this.busLineDeleteRequest.emit([this.busLine!.id, this.busLine!.busLineId, this.busLine!.companyId]);
  }

  _formatDuration(durationInMinutes: number): string {
    return formatDuration(durationInMinutes);
  }
}
