import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private baseUrl = environment.apiLaravelUrl + '/visits';

  constructor(private http: HttpClient) {}

  //  Get all visits
  getVisits(params?: any): Observable<any> {
    return this.http.get(this.baseUrl, { params });
  }

  //  Get single visit
  getVisitById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  //  Update visit (Doctor action)
  updateVisit(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  //  Mark visit as complete
  completeVisit(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/complete/${id}`, {});
  }

  //  Delete visit (Admin only)
  deleteVisit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  //  Export visits to CSV
  exportVisits(params?: any): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export`, {
      params,
      responseType: 'blob'
    });
  }
}