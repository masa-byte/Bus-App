import { Component, inject } from '@angular/core';
import { LatLng, Map, MapOptions, Marker, MarkerOptions, TileLayer } from 'leaflet';
import { VehiclesOnMapService } from '../vehicles-on-map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  public options: MapOptions = {
    layers: [
      new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { minZoom: 0, attribution: '...', })
    ],
    zoom: 0,
    center: new LatLng(43.75, 20.1)
  };

  public layers: Marker[] = [];

  private redis = inject(VehiclesOnMapService);

  constructor() {

    // this.redis.createEventSource().subscribe((messageData: any) => {
    //   console.log(messageData);
    // });

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

  public onMapReady(map: Map) {
    console.log(map);
  }

  public onMapMoveEnd(event: any) {
    // console.log(event);
    // console.log(event.target.getCenter());
    const zoom = event.target.getZoom();
    const initialSquareSize = 40075016.685578488 / Math.pow(2, 1);
    const squareSize = initialSquareSize / Math.pow(2, zoom - 1) / 1000;
    const divWidthInMeters = squareSize * (Math.max(event.target._size.x, event.target._size.y) / 256);
    console.log(divWidthInMeters);
  }
}
