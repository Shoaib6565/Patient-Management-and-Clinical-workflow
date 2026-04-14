// appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private baseUrl = 'http://localhost:8000/api/appointments';

  constructor(private http: HttpClient) {}

  getAppointments(filters: any) {
    let params = new HttpParams();

    Object.keys(filters || {}).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get<any>(this.baseUrl, { params });
  }

  exportCsv(filters: any) {
    let params = new HttpParams();
    Object.keys(filters || {}).forEach(k => {
      if (filters[k]) params = params.set(k, filters[k]);
    });

    return this.http.get(`${this.baseUrl}/export`, {
      params,
      responseType: 'blob'
    });
  }

  deleteAppointment(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateStatus(id: number, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}/cancel`, data);
  }
}
