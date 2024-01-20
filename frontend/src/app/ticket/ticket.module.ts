import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketDialogComponent } from './ticket-dialog/ticket-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TicketDisplayComponent } from './ticket-display/ticket-display.component';

@NgModule({
  declarations: [
    TicketDialogComponent,
    TicketDisplayComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule
  ],
  exports: [
    TicketDialogComponent,
    TicketDisplayComponent
  ]
})
export class TicketModule { }
