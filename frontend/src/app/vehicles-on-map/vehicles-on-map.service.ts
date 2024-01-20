import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Icon, Map, Marker } from 'leaflet';
import { Observable, combineLatest, fromEvent, map, startWith, switchMap, tap } from 'rxjs';
import { url } from '../../environment/environment';
import { VehicleLocationDto } from './vehicle-location.dto';

@Injectable({
  providedIn: 'root'
})
export class VehiclesOnMapService {
  private readonly baseURL = url + "/vehicles";
  private httpClient: HttpClient = inject(HttpClient);

  public onMapReady(mapa: Map): Observable<Marker[]> {
    const mapMove$ = this.mapMove$(mapa);
    const sseMessage$ = this.sseMessage$();

    return combineLatest([mapMove$, sseMessage$]).pipe(
      map(p => p[0]),
      tap(mapa => this.deleteMarkers(mapa)),
      switchMap(mapa => 
        this.httpClient.get<VehicleLocationDto[]>(this.baseURL + '/findByBoundigBox', { params: this.getMapParams(mapa),})
      ),
      map(vehicles => this.vehiclesToMarkers(vehicles, mapa)),
    );
  }

  private mapMove$(mapa: Map) {
    return fromEvent(mapa, 'moveend')
    .pipe(
      map((p: any) => p.target as Map),
      startWith(mapa),
    );
  }

  private sseMessage$() {
    const eventSource = new EventSource(this.baseURL + '/locationUpdates');
    return fromEvent(eventSource, 'message').pipe(startWith(null));
  }

  private deleteMarkers(mapa: Map) {
    mapa.eachLayer(layer => {
      if (layer instanceof Marker) {
        mapa.removeLayer(layer);
      }
    });
  }

  private getMapParams(mapa: Map) {
    return {
      lat: mapa.getCenter().lat,
      lng: mapa.getCenter().lng,
      width: Math.abs(mapa.getBounds().getWest() - mapa.getBounds().getEast()) * 111,
      height: Math.abs(mapa.getBounds().getNorth() - mapa.getBounds().getSouth()) * 111 * 5,
    };
  }

  private vehicleToMarker(vehicle: VehicleLocationDto): Marker {
    const marker = new Marker([vehicle.lat, vehicle.lng], { 
      title: vehicle.vehicleId, 
      icon: new Icon({ 
        iconUrl: 'assets/bus.png', 
        iconSize: [24, 24], 
      }), 
    });
    return marker;
  }

  private vehiclesToMarkers(vehicles: VehicleLocationDto[], mapa: Map): Marker[] {
    return vehicles.map(vehicle => this.vehicleToMarker(vehicle));
  }
}