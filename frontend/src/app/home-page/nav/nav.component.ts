import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  vehiclesOnMap() {
    this.router.navigate(['/vehicles-on-map']);
  }

  signIn() {
    this.router.navigate(['/signInUser']);
  }

  signUp() {
    this.router.navigate(['/signUpUser']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
