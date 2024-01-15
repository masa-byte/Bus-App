import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketDialogComponent } from './ticket-dialog/ticket-dialog.component';


@NgModule({
  declarations: [
    TicketDialogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TicketDialogComponent
  ]
})
export class TicketModule { }
