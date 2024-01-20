import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusLineModule } from './bus-line/bus-line.module';
import { CompanyModule } from './company/company.module';
import { HomePageModule } from './home-page/home-page.module';
import { MainPageModule } from './main-page/main-page.module';
import { BusLineEffects } from './store/effects/bus-line.effects';
import { CompanyEffects } from './store/effects/company.effects';
import { UserEffects } from './store/effects/user.effects';
import { busLineReducer } from './store/reducers/bus-line.reducer';
import { companyReducer } from './store/reducers/company.reducer';
import { userReducer } from './store/reducers/user.reducer';
import { EditProfileModule } from './user/edit-profile/edit-profile.module';
import { VehiclesOnMapModule } from './vehicles-on-map/vehicles-on-map.module';
import { ticketReducer } from './store/reducers/ticket.reducer';
import { TicketEffects } from './store/effects/ticket.effects';


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
      busLines: busLineReducer,
      tickets: ticketReducer
    }, {}),
    EffectsModule.forRoot([
      UserEffects,
      CompanyEffects,
      BusLineEffects,
      TicketEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    LeafletModule,
    VehiclesOnMapModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
