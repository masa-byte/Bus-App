import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusLineFormComponent } from './bus-line-form/bus-line-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BackgroundPictureModule } from '../background-picture/background-picture.module';

@NgModule({
  declarations: [
    BusLineFormComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    BackgroundPictureModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatMenuModule, 
    MatGridListModule,
    MatListModule,
    MatCheckboxModule,
    BackgroundPictureModule
  ]
})
export class BusLineModule { }
