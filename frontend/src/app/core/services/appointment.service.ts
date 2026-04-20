import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiUrl = environment.apiLaravelUrl + '/appointments';

  constructor(private http: HttpClient) {}

  //
  // Dashboard

  getTotalAppointments() {
    return this.http.get<any>(`${this.apiUrl}/total`);
  }


  // Listing + Filters

  getAppointments(filters: any = {}) {
    let params = new HttpParams();

    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get<any>(this.apiUrl, { params });
  }


  // Export CSV

  exportCsv(filters: any = {}) {
    let params = new HttpParams();

    Object.keys(filters).forEach(key => {
      if (filters[key]) params = params.set(key, filters[key]);
    });

    return this.http.get(`${this.apiUrl}/export`, {
      params,
      responseType: 'blob'
    });
  }





  // Create
  createAppointment(data: any) {
    return this.http.post(`${this.apiUrl}`, data);
  }

  // Get by ID
  getAppointmentById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Update
  updateAppointment(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Delete (Admin)
  deleteAppointment(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }



  // Actions

  // Cancel
  cancelAppointment(id: number, reason?: string) {
    return this.http.patch(`${this.apiUrl}/${id}/cancel`, { reason });
  }

  // Reschedule
  rescheduleAppointment(id: number, data: {
    appointment_date: string;
    appointment_time: string;
  }) {
    return this.http.patch(`${this.apiUrl}/${id}/reschedule`, data);
  }

  // Update Status (Doctor)
  updateStatus(id: number, data: { status: string }) {
    return this.http.patch(`${this.apiUrl}/${id}/updateStatus`, data);
  }

  //
  // History
  //
  getPatientHistory(patientId: number) {
    return this.http.get<any>(`${this.apiUrl}/history/${patientId}`);
  }

  //
  // Dropdown APIs (support form)
  //

  // getPatients(search: string = '') {
  //   let params = new HttpParams()
  //     .set('search', search)
  //     .set('limit', 10);

  //   return this.http.get<any>(`${this.apiUrl}/patients`, { params });
  // }

  // getCases(search: string = '') {
  //   let params = new HttpParams()
  //     .set('search', search)
  //     .set('limit', 10);

  //   return this.http.get<any>(`${this.apiUrl}/cases`, { params });
  // }

  // getSpecialties() {
  //   return this.http.get<any>(`${this.apiUrl}/specialties`);
  // }

  // getPracticeLocations() {
  //   return this.http.get<any>(`${this.apiUrl}/practice-locations`);
  // }

  // // Optional (recommended)
  // getDoctorsBySpecialty(specialty_id: number) {
  //   return this.http.get<any>(
  //     `${this.apiUrl}/doctors-by-specialty`,
  //     { params: { specialty_id } }
  //   );
  // }

  
}
