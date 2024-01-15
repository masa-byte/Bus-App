import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';
import * as CompanyActions from '../../../store/actions/company.actions';

@Component({
  selector: 'app-search-companies-bar',
  templateUrl: './search-companies-bar.component.html',
  styleUrls: ['./search-companies-bar.component.scss']
})
export class SearchCompaniesBarComponent {

  searchText: string = '';
  searchControl = new FormControl();
  selectedParameter: string = "noCriteria";
  selectedOrder: string = "desc";

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.search();
      });
  }

  search() {
    let selectedOrder = this.selectedOrder === "desc" ? false : true;

    this.store.dispatch(CompanyActions.sortCompanies({
      sortingCriteria: this.selectedParameter,
      sortAscending: selectedOrder,
      searchText: this.searchText
    }));
  }
}
