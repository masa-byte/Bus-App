import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrl: './ticket-dialog.component.scss'
})
export class TicketDialogComponent {
  // cruise$: Observable<Cruise | undefined> = of();

  // destinations: DestinationIndexed[] = [];
  // suites: SuiteIndexed[] = [];

  // calculatedPrice = 0;

  // userDetails = {
  //   personalChef: false,
  //   bodyguard: false,
  //   tourGuide: false,
  // }

  // destColumnsToDisplay = ['number', 'city', 'country'];
  // destColumnsToDisplayWithExpand = [...this.destColumnsToDisplay, 'expand'];
  // expandedDestElement: DestinationIndexed | null = null;

  // suiteColumnsToDisplay = ['number', 'type', 'pricePerNight', 'choose'];
  // suiteColumnsToDisplayWithExpand = [...this.suiteColumnsToDisplay, 'expand'];
  // expandedSuiteElement: SuiteIndexed | null = null;

  // constructor(private store: Store<AppState>, private dialogRef: MatDialogRef<ReservationDialogComponent>) { }

  // ngOnInit(): void {
  //   this.cruise$ = this.store.select(selectSelectedCruise);
  //   this.cruise$.subscribe(cruise => {
  //     if (cruise) {
  //       this.destinations = cruise.destinations.map((dest, index) => {
  //         return { ...dest, number: index + 1 };
  //       });
  //       this.suites = cruise.cruiseShip!.suites.map((suite, index) => {
  //         return { ...suite, number: index + 1, selected: false };
  //       });
  //       this.suites = this.suites.filter(suite => !suite.occupied);
  //     }
  //   });
  // }

  // handleCheckboxChange(event: any, element: any): void {
  //   this.suites.forEach(suite => {
  //     suite.selected = false;
  //   });
  //   element.selected = event.checked;
  //   this.calculatePrice();
  // }

  // calculatePrice() {
  //   let price = 0;
  //   this.suites.forEach(suite => {
  //     if (suite.selected) {
  //       price += suite.pricePerNight;
  //     }
  //   });
  //   if (this.userDetails.personalChef) {
  //     price += 100;
  //   }
  //   if (this.userDetails.bodyguard) {
  //     price += 50;
  //   }
  //   if (this.userDetails.tourGuide) {
  //     price += 30;
  //   }
  //   this.calculatedPrice = price;
  // }

  // cancel(): void {
  //   this.dialogRef.close(false);
  // }

  // book(): void {
  //   const reservation: Reservation = {
  //     id: 0,
  //     perosnalChef: this.userDetails.personalChef,
  //     bodyguard: this.userDetails.bodyguard,
  //     tourGuide: this.userDetails.tourGuide,
  //     cost: this.calculatedPrice,
  //     isRated: false,
  //     user: undefined,
  //     suite: this.suites.find(suite => suite.selected),
  //     cruise: undefined,
  //   };
  //   this.dialogRef.close(reservation);
  // }
}
