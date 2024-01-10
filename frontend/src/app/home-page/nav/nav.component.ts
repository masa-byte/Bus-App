import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {}

  signIn() {
    this.router.navigate(['/signInUser']);
  }

  signUp() {
    this.router.navigate(['/signUpUser']);
  }

  continueAsGuest() {
    this.router.navigate(['/mainPage', 'listItems']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
