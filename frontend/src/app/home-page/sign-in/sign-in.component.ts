import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import * as UserActions from '../../store/actions/user.actions';
import { selectUserError, selectUser } from '../../store/selectors/user.selectors';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  hidePassword: boolean = true;
  rememberMe: boolean = false;

  user$: Observable<User | null> = of();
  error$: Observable<string | null> = of();

  errorSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.error$ = this.store.select(selectUserError);
  }

  ngOnDestroy(): void {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  signUp() {
    this.router.navigate(['/signUpUser']);
  }

  signIn() {
    this.store.dispatch(UserActions.clearUserError());
    this.store.dispatch(UserActions.signIn({ email: this.email, password: this.password }));

    this.userSubscription = this.user$.subscribe((user) => {
      if (user) {
        localStorage.setItem('userId', user.id.toString());
        localStorage.setItem('rememberMe', this.rememberMe.toString());
        console.log('user', user);
        //this.router.navigate(['/mainPage', 'listItems']);
      }
    });
    this.errorSubscription = this.error$.subscribe((error) => {
      if (error) {
        this.openSnackBar(error);
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
