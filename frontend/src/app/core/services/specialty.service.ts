import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private apiUrl = environment.apiLaravelUrl + '/specialties';

  constructor(private http: HttpClient) {}

  // Get all specialties (with search + filter + pagination)
  getSpecialties(search: string = '', filter: string = 'all', page: number = 1): Observable<any> {

    let params = new HttpParams()
      .set('search', search)
      .set('filter', filter)
      .set('page', page);

    return this.http.get(this.apiUrl, { params });
  }

  // Get single specialty (for edit)
  getSpecialtyById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Create specialty
  createSpecialty(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Update specialty
  updateSpecialty(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Delete specialty
  deleteSpecialty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Activate specialty
  activateSpecialty(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/activate`, {});
  }

  // Deactivate specialty
  deactivateSpecialty(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/deactivate`, {});
  }

}