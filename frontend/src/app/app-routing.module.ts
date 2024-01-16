import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInComponent } from './home-page/sign-in/sign-in.component';
import { SignUpComponent } from './home-page/sign-up/sign-up.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import { BusLineFormComponent } from './bus-line/bus-line-form/bus-line-form.component';
import { BusLineTimeComponent } from './bus-line/bus-line-time/bus-line-time.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homePage',
    pathMatch: 'full',
  },
  {
    path: 'homePage',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'signInUser',
    component: SignInComponent,
    pathMatch: 'full',
  },
  {
    path: 'signUpUser',
    component: SignUpComponent,
    pathMatch: 'full',
  },
  {
    path: 'companyForm',
    component: CompanyFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'busLineForm',
    component: BusLineFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'busLineTimeForm',
    component: BusLineTimeComponent,
    pathMatch: 'full',
  },
  {
    path: 'mainPage',
    loadChildren: () =>
      import('./main-page/main-page.module').then((m) => m.MainPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
