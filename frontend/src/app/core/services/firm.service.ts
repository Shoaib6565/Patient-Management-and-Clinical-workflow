import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FirmService {

  private baseUrl = environment.apiLaravelUrl + '/firms'; // adjust if needed

  constructor(private http: HttpClient) {}

  //  Get All (search + status + type + pagination)
  getFirms(
    search: string = '',
    status: string = 'all', // active | inactive | all
    type: string = '',      // Legal | Corporate | etc.
    page: number = 1
  ): Observable<any> {

    let params = new HttpParams();

    if (search) params = params.set('search', search);
    if (status && status !== 'all') params = params.set('status', status);
    if (type) params = params.set('type', type);
    params = params.set('page', page);

    return this.http.get(this.baseUrl, { params });
  }

  //  Get Single
  getFirmById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create
  createFirm(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  //  Update
  updateFirm(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  //  Delete
  deleteFirm(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  //  Activate
  activateFirm(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/activate/${id}`, {});
  }

  //  Deactivate
  deactivateFirm(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/deactivate/${id}`, {});
  }
}
