import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PracticeLocationService {

  private apiUrl = environment.apiLaravelUrl + '/practice-locations'; // change if needed

  constructor(private http: HttpClient) {}

  //  Get All (with optional filters / pagination)
  getAll(params?: any): Observable<any> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== '') {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    // Default limit to 1000 if not specified
    if (!httpParams.has('limit')) {
      httpParams = httpParams.set('limit', '1000');
    }

    return this.http.get(this.apiUrl, { params: httpParams });
  }

  //  Get Active Locations
  getActive(): Observable<any> {
    return this.http.get(`${this.apiUrl}/active`);
  }

  //  Get Inactive Locations
  getInactive(): Observable<any> {
    return this.http.get(`${this.apiUrl}/inactive`);
  }

  //  Get Single Location
  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  //  Create Location
  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  //  Update Location
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  //  Delete Location (Admin)
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //  Activate Location
  activate(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/activate/${id}`, {});
  }

  //  Deactivate Location
  deactivate(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/deactivate/${id}`, {});
  }
}
