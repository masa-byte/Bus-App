import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { VehiclesOnMapService } from './vehicles-on-map.service';



@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    LeafletModule,
  ],
  providers:[
    VehiclesOnMapService,
  ],
})
export class VehiclesOnMapModule { }
