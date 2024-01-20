import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating: number = 1

  constructor(public dialogRef: MatDialogRef<RatingDialogComponent>) { }

  ngOnInit(): void { }

  highlightStars(index: number) {
    this.selectedRating = index + 1;
  }

  rate(rating: number) {
    this.selectedRating = rating;
    this.dialogRef.close(this.selectedRating);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
