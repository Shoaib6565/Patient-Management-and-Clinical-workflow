import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  private baseUrl = environment.apiLaravelUrl + '/insurances'; // adjust if needed

  constructor(private http: HttpClient) {}

  //  Get All (with search + filter + pagination)
  getInsurances(search: string = '', filter: string = 'all', page: number = 1): Observable<any> {
    let params = new HttpParams();

    if (search) params = params.set('search', search);
    if (filter) params = params.set('filter', filter);
    params = params.set('page', page);

    return this.http.get(this.baseUrl, { params });
  }

  //  Get Single
  getInsuranceById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  //  Create
  createInsurance(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  //  Update
  updateInsurance(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  //  Delete
  deleteInsurance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  //  Activate
  activateInsurance(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/activate/${id}`, {});
  }

  // Deactivate
  deactivateInsurance(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/deactivate/${id}`, {});
  }

  // Alias methods for component usage
  getAll(params?: any): Observable<any> {
    return this.getInsurances(
      params?.search || '',
      params?.filter || 'all',
      params?.page || 1
    );
  }

  create(data: any): Observable<any> {
    return this.createInsurance(data);
  }

  update(id: number, data: any): Observable<any> {
    return this.updateInsurance(id, data);
  }

  delete(id: number): Observable<any> {
    return this.deleteInsurance(id);
  }

  activate(id: number): Observable<any> {
    return this.activateInsurance(id);
  }

  deactivate(id: number): Observable<any> {
    return this.deactivateInsurance(id);
  }
}
