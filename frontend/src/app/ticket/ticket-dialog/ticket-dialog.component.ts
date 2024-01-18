import { Component } from '@angular/core';
import { BusLine } from '../../bus-line/bus-line.model';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { selectSelectedBusLine } from '../../store/selectors/bus-line.selector';
import { Town } from '../../town/town.model';
import { BusLineService } from '../../bus-line/bus-line.service';
import { Ticket } from '../ticket.model';

interface TownIndexed extends Town {
  number: number;
}

interface SpecificDateTimeIndexed {
  date: string;
  departureTime: string;
  number: number;
  selected: boolean;
}

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrl: './ticket-dialog.component.scss'
})
export class TicketDialogComponent {
  busLine$: Observable<BusLine | undefined> = of();
  busLine: BusLine | undefined;

  stops: TownIndexed[] = [];
  departureDatesTimes: SpecificDateTimeIndexed[] = [];

  calculatedPrice = 0;
  index = 1;

  userDetails = {
    discount: false,
    // TO DO friendDiscount: false,
  }

  stopColumnsToDisplay = ['number', 'name', 'population'];

  departureDatesTimesColumnsToDisplay = ['number', 'date', 'departureTime', 'select'];

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<TicketDialogComponent>,
    private busLineService: BusLineService
  ) { }

  ngOnInit(): void {
    this.busLine$ = this.store.select(selectSelectedBusLine);
    this.busLine$.subscribe(busLine => {
      if (busLine) {
        this.busLine = busLine;
        this.calculatedPrice = busLine.oneWayPrice;

        this.stops = busLine.stops.map((stop, index) => {
          return { ...stop, number: index + 1 };
        });

        this.busLineService.getBusLineDepartureTimes(busLine.busLineId, busLine.companyId).subscribe(response => {
          if (response.body) {
            Object.keys(response.body).map((date, index) => {
              for (let i = 0; i < response.body[date].length; i++) {
                this.departureDatesTimes.push({
                  date: date,
                  departureTime: response.body[date][i],
                  number: this.index++,
                  selected: false
                });
              }
            });
          }
        });
      }
    });
  }

  handleCheckboxChange(event: any, element: any): void {
    this.departureDatesTimes.forEach(d => {
      d.selected = false;
    });
    element.selected = event.checked;
  }

  calculatePrice() {
    if (this.userDetails.discount) {
      return Math.round(this.calculatedPrice * (1 - this.busLine!.discount / 100));
    }
    else {
      return this.calculatedPrice;
    }
  }

  isAnyDateSelected(): boolean {
    return this.departureDatesTimes.some(d => d.selected);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  book(): void {
    const ticket: Ticket = {
      id: '',
      userId: '',
      companyId: this.busLine!.companyId,
      busLineId: this.busLine!.busLineId,
      departureDate: this.departureDatesTimes.find(d => d.selected)!.date,
      departureTime: this.departureDatesTimes.find(d => d.selected)!.departureTime,
      price: this.calculatePrice(),
      durationMinutes: this.busLine!.durationMinutes,
      distance: this.busLine!.distance,
      startTownName: this.busLine!.stops[0].name,
      endTownName: this.busLine!.stops.at(-1)!.name,
      ratedCompany: false
    };
    this.dialogRef.close(ticket);
  }

  formatDuration(durationInMinutes: number): string {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    const hoursText = hours > 0 ? `${hours}h` : '';
    const minutesText = minutes > 0 ? `${minutes}min` : '';

    return `${hoursText}${minutesText}`;
  }
}
