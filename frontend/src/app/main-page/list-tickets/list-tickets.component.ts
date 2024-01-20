import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map, of, switchMap, take } from 'rxjs';
import { Ticket } from '../../ticket/ticket.model';
import { User } from '../../user/user.model';
import { selectUser } from '../../store/selectors/user.selectors';
import { PageEvent } from '@angular/material/paginator';
import * as TicketActions from '../../store/actions/ticket.actions';
import { selectTicketEntities, selectTicketError, selectTotalNumberOfTicketsForUserId } from '../../store/selectors/ticket.selector';
import { RatingDialogComponent } from '../../rating-dialog/rating-dialog.component';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.scss'
})
export class ListTicketsComponent implements OnInit, OnDestroy {

  user$: Observable<User | null> = of();
  tickets$: Observable<[string, Ticket | undefined][]> = of();

  userId: string = '0';

  length: number | undefined = undefined;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25];

  showPageSizeOptions: boolean = true;
  showFirstLastButtons: boolean = true;
  pageEvent!: PageEvent;

  ratingErrorSubscription: Subscription = new Subscription();

  @HostBinding('style.overflow')
  overflow = 'auto';

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.user$.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          this.userId = user.id;
          this.store.dispatch(TicketActions.loadTotalNumberOfTicketsForUserId({ userId: this.userId }));
          this.store.dispatch(TicketActions.loadTicketsByUserIdPageIndexPageSize(
            {
              userId: this.userId,
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
            }
          ));
          return this.store.select(selectTotalNumberOfTicketsForUserId);
        } else {
          return of(0);
        }
      })
    ).subscribe((totalNumberOfTickets) => {
      this.length = totalNumberOfTickets;
    });
    this.tickets$ = this.store.select(selectTicketEntities).pipe(
      map((ticketEntities) => Object.entries(ticketEntities)),
    );
  }

  ngOnDestroy(): void {
    this.ratingErrorSubscription.unsubscribe();
  }

  rateTicket(event: string) {
    if (event == "-1")
      this.openSnackBar('Trip not finished yet!');
    else if (event) {
      const dialogRef = this.dialog.open(RatingDialogComponent, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.store.dispatch(TicketActions.rateCompany({ ticketId: event, rating: result as number }));
          this.ratingErrorSubscription = this.store.select(selectTicketError).subscribe((rateError) => {
            if (rateError)
              this.openSnackBar(rateError);
            else {
              this.openSnackBar('Company rated successfully!');
            }
          });
        }
      });
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.store.dispatch(TicketActions.loadTicketsByUserIdPageIndexPageSize(
      {
        userId: this.userId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
    ));
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
