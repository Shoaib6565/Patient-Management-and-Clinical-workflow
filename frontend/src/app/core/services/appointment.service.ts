// appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiUrl = environment.apiLaravelUrl;

  constructor(private http: HttpClient) {}

  getAppointments(filters: any) {
    let params = new HttpParams();

    Object.keys(filters || {}).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get<any>(this.apiUrl + '/appointments', { params });
  }

  exportCsv(filters: any) {
    let params = new HttpParams();
    Object.keys(filters || {}).forEach(k => {
      if (filters[k]) params = params.set(k, filters[k]);
    });

    return this.http.get(`${this.apiUrl}/appointments/export`, {
      params,
      responseType: 'blob'
    });
  }

  deleteAppointment(id: number) {
    return this.http.delete(`${this.apiUrl}/appointments/${id}`);
  }

  updateStatus(id: number, data: any) {
    console.log('Updating appointment status:', { id, data });
    return this.http.patch(`${this.apiUrl}/appointments/${id}/updateStatus`, data);
  }
}
