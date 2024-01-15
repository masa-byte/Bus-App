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

  getTotalNumberOfBusLinesByStartDestEndDest(startDestId: number, endDestId: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/bus-line/total?startDestId=' + startDestId + '&endDestId=' + endDestId,
      { headers: headers, observe: 'response' }
    );
  }

  getBusLinesByStartDestEndDestPageIndexPageSize
    (startDestId: number, endDestId: number, pageIndex: number, pageSize: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/bus-line' +
      '?startDestId=' + startDestId +
      '&endDestId=' + endDestId +
      '&pageIndex=' + pageIndex +
      '&pageSize=' + pageSize,
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
