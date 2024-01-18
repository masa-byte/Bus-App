import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageModule } from './home-page/home-page.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userReducer } from './store/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MainPageModule } from './main-page/main-page.module';
import { EditProfileModule } from './user/edit-profile/edit-profile.module';
import { CompanyModule } from './company/company.module';
import { companyReducer } from './store/reducers/company.reducer';
import { CompanyEffects } from './store/effects/company.effects';
import { BusLineModule } from './bus-line/bus-line.module';
import { busLineReducer } from './store/reducers/bus-line.reducer';
import { BusLineEffects } from './store/effects/bus-line.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomePageModule,
    MainPageModule,
    EditProfileModule,
    CompanyModule,
    BusLineModule,
    StoreModule.forRoot({
      user: userReducer,
      companies: companyReducer,
      busLines: busLineReducer
    }, {}),
    EffectsModule.forRoot([
      UserEffects,
      CompanyEffects,
      BusLineEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
