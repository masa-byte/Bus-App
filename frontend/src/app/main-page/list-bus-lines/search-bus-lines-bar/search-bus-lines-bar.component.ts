import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';
import * as BusLineActions from '../../../store/actions/bus-line.actions';
import { Town } from '../../../town/town.model';
import { mapToTown } from '../../../utility/utility';
import { TownService } from '../../../town/town.service';

@Component({
  selector: 'app-search-bus-lines-bar',
  templateUrl: './search-bus-lines-bar.component.html',
  styleUrl: './search-bus-lines-bar.component.scss'
})
export class SearchBusLinesBarComponent implements OnInit, OnDestroy {

  @Output() busLineFetchRequest = new EventEmitter<number[]>();

  searchText: string = '';
  searchControl = new FormControl();
  selectedParameter: string = "noCriteria";
  selectedOrder: string = "desc";
  startDestId: number | undefined = undefined;
  endDestId: number | undefined = undefined;

  towns: Town[] = [];
  townsSubscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private townService: TownService
  ) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.searchByText();
      });

    this.townService.getAllTowns().subscribe(response => {
      let body = response.body;
      body.map((town: Town) => {
        const t = mapToTown(town)
        this.towns.push(t);
      });
    });
  }

  ngOnDestroy(): void {
    this.townsSubscription.unsubscribe();
  }

  searchByDestinations() {
    this.busLineFetchRequest.emit([this.startDestId!, this.endDestId!]);
  }

  searchByText() {
    let selectedOrder = this.selectedOrder === "desc" ? false : true;

    this.store.dispatch(BusLineActions.sortBusLines({
      sortingCriteria: this.selectedParameter,
      sortAscending: selectedOrder,
      searchText: this.searchText
    }));
  }
}
