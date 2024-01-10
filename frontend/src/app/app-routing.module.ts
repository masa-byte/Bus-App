import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInComponent } from './home-page/sign-in/sign-in.component';
import { SignUpComponent } from './home-page/sign-up/sign-up.component';

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
