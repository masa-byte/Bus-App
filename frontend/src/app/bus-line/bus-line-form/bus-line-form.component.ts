import { Component } from '@angular/core';
import { BusLine } from '../bus-line.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, of, Subscription, map } from 'rxjs';
import { selectUser } from '../../store/selectors/user.selectors';
import * as TownActions from '../../store/actions/town.actions';
import { selectTownEntities } from '../../store/selectors/town.selector';
import { Town } from '../../town/town.model';
import { User } from '../../user/user.model';
import { selectBusLineError } from '../../store/selectors/bus-line.selector';
import * as BusLineActions from '../../store/actions/bus-line.actions';

@Component({
  selector: 'app-bus-line-form',
  templateUrl: './bus-line-form.component.html',
  styleUrl: './bus-line-form.component.scss'
})
export class BusLineFormComponent {
  busLine: BusLine = {
    id: '',
    busLineId: '',
    companyId: '',
    companyName: '',
    stops: [],
    distance: 0,
    durationMinutes: 0,
    oneWayPrice: 0,
    returnPrice: 0,
    discount: 0
  };

  townsArr: Town[] = [];

  townFormGroup: FormGroup;

  user: User | undefined = undefined;
  error$: Observable<string | null> = of();
  errorSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();
  townsSubscription: Subscription = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.townFormGroup = this.fb.group({
      towns: this.fb.array([])
    });
    this.addTown();
    this.addTown();
  }

  ngOnInit(): void {
    this.store.dispatch(TownActions.loadTowns());

    this.error$ = this.store.select(selectBusLineError);

    this.userSubscription = this.store.select(selectUser).subscribe((user) => {
      if (user)
        this.user = user;
    });

    this.townsSubscription = this.store.select(selectTownEntities)
      .pipe(
        map((townEntities) => Object.entries(townEntities))
      )
      .subscribe((towns) => {
        for (let town of towns) {
          this.townsArr.push(town[1]!);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.errorSubscription)
      this.errorSubscription.unsubscribe();
    if (this.userSubscription)
      this.userSubscription.unsubscribe();
  }

  get towns(): FormArray {
    return this.townFormGroup.get('towns') as FormArray;
  }

  addTown() {
    this.towns.push(this.fb.group({
      stop: ['', Validators.required]
    }));
  }

  removeTown(index: number) {
    if (this.towns.length > 2)
      this.towns.removeAt(index);
  }

  action() {
    this.createBusLine();
    this.getTowns();

    this.store.dispatch(BusLineActions.clearBusLineError());
    this.store.dispatch(BusLineActions.addBusLine({ busLine: this.busLine }));

    this.errorSubscription = this.error$.subscribe((error) => {
      if (error)
        this.openSnackBar(error);
      else {
        this.openSnackBar("Bus Line successfully added!");
        this.router.navigate(['mainPage', 'listBusLines']);
      }
    });
  }

  createBusLine() {
    this.busLine.companyId = this.user!.id;
    this.busLine.companyName = this.user!.name;
  }

  getTowns() {
    for (let i = 0; i < this.towns.length; i++) {
      const stop = this.towns.at(i).get('stop')!.value;
      const town = this.townsArr.find((town) => town.name === stop);
      this.busLine.stops.push(town!);
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
