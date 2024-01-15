import { Component, HostBinding } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, map } from 'rxjs';
import { BusLine } from '../../bus-line/bus-line.model';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { selectFilteredBusLines, selectTotalNumberOfBusLines } from '../../store/selectors/bus-line.selector';
import * as BusLineActions from '../../store/actions/bus-line.actions';

@Component({
  selector: 'app-list-bus-lines',
  templateUrl: './list-bus-lines.component.html',
  styleUrl: './list-bus-lines.component.scss'
})
export class ListBusLinesComponent {
  @HostBinding('style.overflow')
  overflow = 'auto';

  length: number | undefined = undefined;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25];

  showPageSizeOptions: boolean = true;
  showFirstLastButtons: boolean = true;
  pageEvent!: PageEvent;

  busLines$: Observable<[string, BusLine | undefined][]> = of();
  subscription: Subscription = new Subscription();

  startDestId: number | undefined = undefined;
  endDestId: number | undefined = undefined;

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select(selectTotalNumberOfBusLines).subscribe((totalNumberOfBusLines) => {
      this.length = totalNumberOfBusLines;
    });
    this.busLines$ = this.store.select(selectFilteredBusLines).pipe(
      map((busLineEntities) => Object.entries(busLineEntities)),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.store.dispatch(BusLineActions.loadBusLinesByStartDestEndDestPageIndexPageSize(
      {
        startDestId: this.startDestId!,
        endDestId: this.endDestId!,
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

  fetchBusLines(event: number[]) {
    this.startDestId = event[0];
    this.endDestId = event[1];
    this.store.dispatch(BusLineActions.loadTotalNumberOfBusLinesByStartDestEndDest({ startDestId: this.startDestId, endDestId: this.endDestId }));
    this.store.dispatch(BusLineActions.loadBusLinesByStartDestEndDestPageIndexPageSize(
      {
        startDestId: this.startDestId,
        endDestId: this.endDestId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
    ));
  }

  deleteBusLine(event: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(BusLineActions.deleteBusLine({ id: event }));
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
