import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserType } from '../../store/selectors/user.selectors';
import * as UserAction from '../../store/actions/user.actions';

@Component({
  selector: 'app-nav-main-page',
  templateUrl: './nav-main-page.component.html',
  styleUrls: ['./nav-main-page.component.scss']
})
export class NavMainPageComponent implements OnInit {

  userType: string | undefined = '';

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.select(selectUserType).subscribe((userType) => {
      this.userType = userType;
    });
  }

  addNewCompany() {
    this.router.navigate(['companyForm']);
  }

  openMainPage() {
    this.router.navigate(['mainPage', 'listItems']);
  }

  openProfile() {
    if (this.userType == undefined) {
      this.router.navigate(['signUpUser']);
    }
    else {
      this.router.navigate(['mainPage', 'profile']);
    }
  }

  signOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('rememberMe');
    this.store.dispatch(UserAction.signOut());
    this.router.navigate(['']);
  }
}
