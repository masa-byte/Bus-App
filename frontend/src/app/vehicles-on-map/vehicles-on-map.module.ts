import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesOnMapComponent } from './vehicles-on-map.component';
import { VehiclesOnMapService } from './vehicles-on-map.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';



@NgModule({
  declarations: [
    VehiclesOnMapComponent
  ],
  imports: [
    CommonModule,
    LeafletModule,
  ],
  providers: [
    VehiclesOnMapService,
  ],
})
export class VehiclesOnMapModule { }
