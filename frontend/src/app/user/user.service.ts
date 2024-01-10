import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../../environment/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  createCompanyUser(company: User): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(url + '/user',
      { company: company },
      { headers: headers, observe: 'response' }
    );
  }

  signUp(email: string, password: string, name: string, surname: string, birthDate: Date, phone: string): Observable<HttpResponse<any>> {
    return this.http.post(url + '/auth/signup',
      { email: email, password: password, name: name, surname: surname, birthDate: birthDate, phone: phone },
      { observe: 'response' }
    );
  }

  signIn(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post(url + '/auth/signin',
      { email: email, password: password },
      { observe: 'response' }
    );
  }

  auth(token: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(url + '/auth/profile', {
      headers: headers,
      observe: 'response',
    });
  }

  getUser(id: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/user/' + id,
      { headers: headers, observe: 'response' });
  }

  updateUser(user: User): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + '/user/',
      { user: user },
      { headers: headers, observe: 'response' }
    );
  }

  deleteUser(id: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete(url + '/user/' + id,
      { headers: headers, observe: 'response' });
  }

  checkPassword(id: number, password: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/user/' + id + '/checkpassword/' + password,
      { headers: headers, observe: 'response' }
    );
  }
}