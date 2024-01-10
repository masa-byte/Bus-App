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
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { VehiclesOnMapModule } from './vehicles-on-map/vehicles-on-map.module';

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
    StoreModule.forRoot({
      user: userReducer
    }, {}),
    EffectsModule.forRoot([
      UserEffects
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
