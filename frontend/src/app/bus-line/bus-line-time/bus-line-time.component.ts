import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../user/user.model';
import { Observable, Subscription, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectBusLineError, selectCompanyBusLineIds } from '../../store/selectors/bus-line.selector';
import { selectUser } from '../../store/selectors/user.selectors';
import * as BusLineActions from '../../store/actions/bus-line.actions';
import { BusLineDepartureTimes } from '../bus-line-departure-times.model';

@Component({
  selector: 'app-bus-line-time',
  templateUrl: './bus-line-time.component.html',
  styleUrl: './bus-line-time.component.scss'
})
export class BusLineTimeComponent {
  busLineDepartureTimes: BusLineDepartureTimes = {
    id: '',
    busLineId: '',
    departureTimes: [],
    capacities: [],
    companyId: '',
    companyName: ''
  }

  busLineIds: string[] = [];

  busLineTimeFormGroup: FormGroup;

  user: User | undefined = undefined;
  error$: Observable<string | null> = of();

  errorSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();
  busLinesSubscription: Subscription = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.busLineTimeFormGroup = this.fb.group({
      busLineId: ['', Validators.required],
      departureTimes: this.fb.array([]),
      capacity: ['', Validators.required]
    });
    this.addDepartureTime();
  }

  ngOnInit(): void {
    this.error$ = this.store.select(selectBusLineError);

    this.userSubscription = this.store.select(selectUser).subscribe((user) => {
      if (user) {
        this.user = user;
        this.store.dispatch(BusLineActions.loadBusLineIdsForCompany({ companyId: this.user.id }));
      }
    });

    this.busLinesSubscription = this.store.select(selectCompanyBusLineIds).subscribe((busLineIds) => {
      this.busLineIds = busLineIds;
    });
  }

  ngOnDestroy(): void {
    if (this.errorSubscription)
      this.errorSubscription.unsubscribe();
    if (this.userSubscription)
      this.userSubscription.unsubscribe();
  }

  action() {
    this.getDepartureTimes();
    this.createBusLineTime();

    this.store.dispatch(BusLineActions.clearBusLineError());
    this.store.dispatch(BusLineActions.addBusLineDepartureTimes({ busLineDepartureTimes: this.busLineDepartureTimes }));

    this.errorSubscription = this.error$.subscribe((error) => {
      if (error)
        this.openSnackBar(error);
      else {
        this.openSnackBar("Bus Line Departure Times successfully added!");
        this.router.navigate(['mainPage', 'listBusLines']);
      }
    });
  }

  createBusLineTime() {
    this.busLineDepartureTimes.busLineId = this.busLineTimeFormGroup.get('busLineId')!.value;
    this.busLineDepartureTimes.companyId = this.user!.id;
    this.busLineDepartureTimes.companyName = this.user!.name;
    const capacity = this.busLineTimeFormGroup.get('capacity')!.value;
    this.busLineDepartureTimes.capacities = new Array(this.busLineDepartureTimes.departureTimes.length).fill(capacity);
  }

  getDepartureTimes() {
    for (let i = 0; i < this.departureTimes.length; i++) {
      const dt = this.departureTimes.at(i).get('dt')!.value;
      this.busLineDepartureTimes.departureTimes.push(dt);
    }
  }

  get departureTimes(): FormArray {
    return this.busLineTimeFormGroup.get('departureTimes') as FormArray;
  }

  addDepartureTime() {
    this.departureTimes.push(this.fb.group({
      dt: ['', Validators.required]
    }));
  }

  removeDepartureTime(index: number) {
    if (this.departureTimes.length > 1) {
      this.departureTimes.removeAt(index);
    }
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
