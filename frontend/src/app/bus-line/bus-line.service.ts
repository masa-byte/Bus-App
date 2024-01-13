import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusLine } from './bus-line.model';
import { Observable } from 'rxjs';
import { url } from '../../environment/environment';
import { Town } from '../town/town.model';

@Injectable({
  providedIn: 'root'
})
export class BusLineService {

  constructor(private http: HttpClient) { }

  createBusLine(busLine: BusLine): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(url + '/bus-line',
      { busLine },
      { headers: headers, observe: 'response' }
    );
  }

  getBusLinesByStartDestEndDest(startDest: Town, endDest: Town): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/bus-line' + '?startDest=' + startDest.id + '&endDest=' + endDest.id, 
    { headers: headers, observe: 'response' });
  }

  getBusLine(id: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/bus-line/' + id, { headers: headers, observe: 'response' });
  }

  deleteBusLine(id: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete(url + '/bus-line/' + id,
      { headers: headers, observe: 'response' }
    );
  }
}
