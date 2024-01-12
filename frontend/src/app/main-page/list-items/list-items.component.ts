import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, map, tap } from 'rxjs';
import * as CompanyActions from '../../store/actions/company.actions';
import { selectCompanyEntities, selectFilteredCompanies, selectTotalNumberOfCompanies } from '../../store/selectors/company.selector';
import { CompanyUser } from '../../user/company-user';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit, OnDestroy {

  @HostBinding('style.overflow')
  overflow = 'auto';

  length: number | undefined = undefined;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25];

  showPageSizeOptions: boolean = true;
  showFirstLastButtons: boolean = true;
  pageEvent!: PageEvent;

  companies$: Observable<[string, CompanyUser | undefined][]> = of();
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select(selectTotalNumberOfCompanies).subscribe((totalNumberOfCompanies) => {
      this.length = totalNumberOfCompanies;
    });
    this.companies$ = this.store.select(selectFilteredCompanies).pipe(
      map((companyEntities) => Object.entries(companyEntities)),
    );
    this.store.dispatch(CompanyActions.loadTotalNumberOfCompanies());
    this.store.dispatch(CompanyActions.loadCompaniesByPageIndexPageSize({ pageIndex: this.pageIndex, pageSize: this.pageSize }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.store.dispatch(CompanyActions.loadCompaniesByPageIndexPageSize({ pageIndex: this.pageIndex, pageSize: this.pageSize }));
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  deleteCompany(event: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(CompanyActions.deleteCompany({ id: event }));
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
