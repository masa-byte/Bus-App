import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, take } from 'rxjs';
import { User } from '../user.model';
import { selectUser } from '../../store/selectors/user.selectors';
import * as UserActions from '../../store/actions/user.actions';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | null> = of();
  img = 'assets/profile.png';

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
  }

  deleteProfile() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.user$.pipe(take(1)).subscribe((user) => {
          if (user) {
            localStorage.removeItem('userId');
            localStorage.removeItem('rememberMe');
            this.store.dispatch(UserActions.deleteUser({ userId: user.id }));
            this.router.navigate(['']);
          }
        });
      }
    });
  }

  editProfile() {
    const dialogRef = this.dialog.open(EditProfileComponent);
    dialogRef.afterClosed().subscribe(() => {});
  }
}
