import { Component } from '@angular/core';
import { LatLng, MapOptions, Marker, MarkerOptions, TileLayer } from 'leaflet';

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
    zoom: 10,
    center: new LatLng(43.75, 20.1)
  };

  public layers: Marker[] = [];

  constructor() {
    const newMarker = new Marker([43.75, 20.1]);
    newMarker.bindPopup(`Random marker ${Math.random() * 10}`);
    newMarker.bindTooltip(`Random markeree ${Math.random() * 10}`);
    newMarker.setPopupContent(`Random marker ${Math.random() * 10}`);
    this.layers = [...this.layers, newMarker];
    setInterval(() => {
      // const x: MarkerOptions = {};
      // x.title = `Random marker ${Math.random() * 10}`;
      // const newMarker = new Marker([44.0 + Math.random() * 10 - 5, 20.0 + Math.random() * 10 - 5], x);
      // this.layers = [...this.layers, newMarker];
      this.layers = this.layers.map((marker) => {
        
        //marker.setLatLng([marker.getLatLng().lat + 0.5, marker.getLatLng().lng + 0.2]);
        return newMarker;
      });
    }, 1000);
  }

}
