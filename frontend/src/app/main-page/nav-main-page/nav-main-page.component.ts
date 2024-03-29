import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserType } from '../../store/selectors/user.selectors';
import * as UserAction from '../../store/actions/user.actions';
import { clearBusLines } from '../../store/actions/bus-line.actions';
import { Subscription } from 'rxjs';
import { clearTickets } from '../../store/actions/ticket.actions';

@Component({
  selector: 'app-nav-main-page',
  templateUrl: './nav-main-page.component.html',
  styleUrls: ['./nav-main-page.component.scss']
})
export class NavMainPageComponent implements OnInit, OnDestroy {

  userType: string | undefined = '';
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select(selectUserType).subscribe((userType) => {
      this.userType = userType;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addNewCompany() {
    this.router.navigate(['companyForm']);
  }

  addNewBusLine() {
    this.router.navigate(['busLineForm']);
  }

  addNewBusLineTime() {
    this.router.navigate(['busLineTimeForm']);
  }

  openVehiclesOnMap() {
    this.router.navigate(['vehiclesOnMap']);
  }

  openMyTickets() {
    this.router.navigate(['mainPage', 'listTickets']);
  }

  openMainPage() {
    this.router.navigate(['mainPage', 'listBusLines']);
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
    this.store.dispatch(clearBusLines());
    this.store.dispatch(clearTickets());
    this.store.dispatch(UserAction.signOut());
    this.router.navigate(['']);
  }
}
