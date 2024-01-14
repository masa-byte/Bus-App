import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../../environment/environment';
import { CompanyUser } from '../user/company-user.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getTotalNumberOfCompanies(): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/company/total',
      { headers: headers, observe: 'response' }
    );
  }

  getCompaniesByPageIndexPageNumber(pageIndex: number, pageSize: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/company?pageIndex=' + pageIndex + '&pageSize=' + pageSize,
      { headers: headers, observe: 'response' }
    );
  }

  createCompanyUser(company: CompanyUser): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(url + '/company',
      { company: company },
      { headers: headers, observe: 'response' }
    );
  }

  deleteCompany(id: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete(url + '/company/' + id,
      { headers: headers, observe: 'response' }
    );
  }

  rateCompany(id: string, rating: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + '/company/rate/' + id,
      { rating },
      { headers: headers, observe: 'response' }
    );
  }
}
