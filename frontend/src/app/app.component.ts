import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from './store/actions/user.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bus app';

  constructor(
    private store: Store,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedUserId = localStorage.getItem('userId');
      const savedRememberMe = localStorage.getItem('rememberMe');
      if (savedRememberMe) {
        const rememberMe = savedRememberMe === 'true';
        if (rememberMe) {
          const id = parseInt(savedUserId as string);
          this.store.dispatch(UserActions.setUserId({ userId: id }));
          this.router.navigate(['mainPage', 'listCompanies']);
        }
        else {
          localStorage.removeItem('userId');
          this.router.navigate(['']);
        }
      }
      else {
        this.router.navigate(['']);
      }
    }
  }
}
