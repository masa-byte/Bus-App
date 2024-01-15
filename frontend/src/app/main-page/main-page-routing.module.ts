import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { ListBusLinesComponent } from './list-bus-lines/list-bus-lines.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'profile', 
        component: ProfileComponent
      },
      {
        path: 'listCompanies',
        component: ListCompaniesComponent
      },
      {
        path: 'listBusLines',
        component: ListBusLinesComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
