import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { url } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesOnMapService {

  private readonly baseURL = url + "/vehicles";
  private httpClient: HttpClient = inject(HttpClient);
  public vehiclesCoordinates = new Subject<any>();
  public lat: number = 0.0;
  public lon: number = 0.0;
  public w: number = 0.0;
  public h: number = 0.0;

  constructor() { 
    this.createEventSource();
  }

  createEventSource() {
    const eventSource = new EventSource(this.baseURL + '/locationUpdates');

    eventSource.onmessage = event => {
      //this.vehiclesCoordinates.next(event.data);
      this.findVehiclesByBoundingBox(this.lat, this.lon, this.w, this.h).subscribe(data => {
        this.vehiclesCoordinates.next(data);
      });
    };
 }

 findVehiclesByBoundingBox(lon: number, lat: number, w: number, h: number): Observable<any> {
  return this.httpClient.get(`http://localhost:3000/vehicles/findByBoundigBox?lon=${lon}&lat=${lat}&w=${w}&h=${h}`);
 }
}
