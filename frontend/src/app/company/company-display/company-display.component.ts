import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/selectors/user.selectors';
import { Observable, of } from 'rxjs';
import { CompanyUser } from '../../user/company-user.model';

@Component({
  selector: 'app-company-display',
  templateUrl: './company-display.component.html',
  styleUrls: ['./company-display.component.scss']
})
export class CompanyDisplayComponent implements OnInit {

  user$: Observable<User | null> = of();
  @Input() company!: CompanyUser | undefined;
  @Output() companyDeleteRequest = new EventEmitter<string>();

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
  }

  deleteCompany() {
    this.companyDeleteRequest.emit(this.company!.id);
  }
}
