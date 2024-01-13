import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TownService {

  constructor(private http: HttpClient) { }

  getAllTowns(): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/town',
      { headers: headers, observe: 'response' });
  }
}
