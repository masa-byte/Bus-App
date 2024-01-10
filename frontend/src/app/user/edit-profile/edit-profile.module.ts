import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  exports: [
    EditProfileComponent
  ]
})
export class EditProfileModule { }
