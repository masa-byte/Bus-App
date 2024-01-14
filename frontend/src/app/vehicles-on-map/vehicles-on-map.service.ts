import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesOnMapService {

  constructor() { }

  createEventSource(): Observable<any> {
    const eventSource = new EventSource('http://localhost:3000/sse');

    return new Observable(observer => {
        eventSource.onmessage = event => {
          const messageData: any = JSON.parse(event.data);
          observer.next(messageData);
      };
    });
 }
}
