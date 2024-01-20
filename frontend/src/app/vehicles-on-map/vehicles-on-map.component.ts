import { Component, inject } from '@angular/core';
import { Icon, LatLng, Map, MapOptions, Marker, MarkerOptions, TileLayer } from 'leaflet';
import { Observable, combineLatest, fromEvent, map, startWith, switchMap, tap } from 'rxjs';
import { VehiclesOnMapService } from './vehicles-on-map.service';
import { url } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { VehicleLocationDto } from './vehicle-location.dto';

@Component({
  selector: 'app-vehicles-on-map',
  templateUrl: './vehicles-on-map.component.html',
  styleUrl: './vehicles-on-map.component.scss'
})
export class VehiclesOnMapComponent {
  public options: MapOptions = {
    layers: [
      new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { minZoom: 0, attribution: '...', })
    ],
    zoom: 7,
    center: new LatLng(43.75, 20.1)
  };
  public layer$: Observable<Marker[]> = new Observable<Marker[]>();

  private vehiclesOnMapService = inject(VehiclesOnMapService);
  private readonly baseURL = url + "/vehicles";
  private httpClient: HttpClient = inject(HttpClient);

  public onMapReady(mapa: Map) {
    this.layer$ = this.vehiclesOnMapService.onMapReady(mapa)
    // .pipe( tap(p => console.log(p)),);
  }

  public onMapMoveEnd(event: any) {
    const mapa: Map = event.target;
  }
}
