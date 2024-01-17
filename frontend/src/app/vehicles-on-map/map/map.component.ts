import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { LatLng, Map, MapOptions, Marker, MarkerOptions, TileLayer } from 'leaflet';
import { VehiclesOnMapService } from '../vehicles-on-map.service';
import { Observable, map, tap } from 'rxjs';

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
    zoom: 7,
    center: new LatLng(43.75, 20.1)
  };

  public layer$: Observable<Marker[]> = new Observable<Marker[]>();

  private vehiclesOnMapService = inject(VehiclesOnMapService);

  public onMapReady(mapa: Map) {
    this.vehiclesOnMapService.lat = mapa.getCenter().lat;
    this.vehiclesOnMapService.lon = mapa.getCenter().lng;
    this.vehiclesOnMapService.w = mapa.getSize().x;
    this.vehiclesOnMapService.h = mapa.getSize().y;

    this.layer$ = this.vehiclesOnMapService.vehiclesCoordinates.pipe(
      tap((data) => mapa.eachLayer((layer) => {
        if (layer instanceof Marker) {
          mapa.removeLayer(layer);
        } 
      })),
      map((data: any[]) => data.map((p) => {
        console.log(p);
        const x: MarkerOptions = {};
        x.title = p[0];
        const newMarker = new Marker([+p[1][0], +p[1][1]], x);
        newMarker.addTo(mapa);
        return newMarker;
      })),
    );
  }

  public onMapMoveEnd(event: any) {
    const map = event.target;
    this.vehiclesOnMapService.lat = map.getCenter().lat;
    this.vehiclesOnMapService.lon = map.getCenter().lng;
    this.vehiclesOnMapService.w = map.getSize().x;
    this.vehiclesOnMapService.h = map.getSize().y;
  }
}
