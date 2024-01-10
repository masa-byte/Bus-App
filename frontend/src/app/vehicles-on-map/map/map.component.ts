import { Component } from '@angular/core';
import { LatLng, MapOptions, TileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  public options: MapOptions = {
    layers: [
      new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: new LatLng(44.0, 20.0)
  };

}
