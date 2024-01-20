import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { NavMainPageComponent } from './nav-main-page/nav-main-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BackgroundPictureModule } from '../background-picture/background-picture.module';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from '../user/profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DeleteDialogModule } from '../delete-dialog/delete-profile.module';
import { EditProfileModule } from '../user/edit-profile/edit-profile.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CompanyModule } from '../company/company.module';
import { SearchCompaniesBarModule } from './list-companies/search-companies-bar/search-companies-bar.module';
import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { ListBusLinesComponent } from './list-bus-lines/list-bus-lines.component';
import { SearchBusLinesBarModule } from './list-bus-lines/search-bus-lines-bar/search-bus-lines-bar.module';
import { BusLineModule } from '../bus-line/bus-line.module';
import { ListTicketsComponent } from './list-tickets/list-tickets.component';
import { TicketModule } from '../ticket/ticket.module';
import { RatingDialogModule } from '../rating-dialog/rating-dialog.module';
@NgModule({
  declarations: [
    MainPageComponent,
    NavMainPageComponent,
    ListCompaniesComponent,
    ProfileComponent,
    ListBusLinesComponent,
    ListTicketsComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MainPageRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    BackgroundPictureModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    EditProfileModule,
    DeleteDialogModule,
    MatPaginatorModule,
    CompanyModule,
    BusLineModule,
    SearchCompaniesBarModule,
    SearchBusLinesBarModule,
    TicketModule,
    RatingDialogModule
  ],
  exports: [NavMainPageComponent]
})
export class MainPageModule { }

