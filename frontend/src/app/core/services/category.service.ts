import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8000/api/categories'; // adjust if needed

  constructor(private http: HttpClient) {}

  //  Get All (search + filter + pagination)
  getCategories(
    search: string = '',
    filter: string = 'all', // active | inactive | all
    page: number = 1
  ): Observable<any> {

    let params = new HttpParams();

    if (search) params = params.set('search', search);
    if (filter && filter !== 'all') params = params.set('filter', filter);
    params = params.set('page', page);

    return this.http.get(this.baseUrl, { params });
  }

  //  Get Single
  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  //  Create
  createCategory(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  //  Update
  updateCategory(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  //  Delete
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  //  Activate
  activateCategory(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/activate`, {});
  }

  //  Deactivate
  deactivateCategory(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/deactivate`, {});
  }
}
