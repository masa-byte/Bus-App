import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import * as CompanyActions from '../../store/actions/company.actions';
import { CompanyUser } from '../../user/company-user.model';
import { selectCompanyError } from '../../store/selectors/company.selector';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent {
  company: CompanyUser = {
    id: '',
    email: '',
    password: '',
    name: '',
    phone: '',
    yearEstablished: 0,
    regularPriceFactor: 0,
    returnPriceFactor: 0,
    discount: 0,
    type: 'company',
  };

  hidePassword: boolean = true;

  error$: Observable<string | null> = of();
  errorSubscription: Subscription = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.error$ = this.store.select(selectCompanyError);
  }

  ngOnDestroy(): void {
    if (this.errorSubscription)
      this.errorSubscription.unsubscribe();
  }

  action() {
    this.store.dispatch(CompanyActions.clearCompanyError());
    this.store.dispatch(CompanyActions.createCompanyUser({ company: this.company }));

    this.errorSubscription = this.error$.subscribe((error) => {
      if (error)
        this.openSnackBar(error);
      else
        this.openSnackBar("Company user successfully added!");
      this.router.navigate(['/mainPage', 'listCompanies']);
    });
  }

  back() {
    window.history.back();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
