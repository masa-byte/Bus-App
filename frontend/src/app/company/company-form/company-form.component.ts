import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { User } from '../../user/user.model';
import { selectUserError } from '../../store/selectors/user.selectors';
import * as UserActions from '../../store/actions/user.actions';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent {
  company: User = {
    id: '',
    email: '',
    password: '',
    name: '',
    phone: '',
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
    this.error$ = this.store.select(selectUserError);
  }

  ngOnDestroy(): void {
    if (this.errorSubscription)
      this.errorSubscription.unsubscribe();
  }

  action() {
    this.store.dispatch(UserActions.clearUserError());
    this.store.dispatch(UserActions.createCompanyUser({ company: this.company }));

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
