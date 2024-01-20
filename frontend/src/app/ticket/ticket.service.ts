import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../../environment/environment';
import { Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getTotalNumberOfTicketsForUser(userId: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/ticket/user/total/' + userId,
      { headers: headers, observe: 'response' });
  }

  getTickerByUserIdPageIndexPageSize(userId: string, pageIndex: number, pageSize: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/ticket/user/' + userId + '/' + pageIndex + '/' + pageSize,
      { headers: headers, observe: 'response' });
  }

  createTicket(ticket: Ticket): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(url + '/ticket',
      {
        ticket
      },
      { headers: headers, observe: 'response' });
  }

  rateCompany(ticketId: string, rating: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + '/ticket/rate/' + ticketId,
      {
        rating
      },
      { headers: headers, observe: 'response' });
  }
}
