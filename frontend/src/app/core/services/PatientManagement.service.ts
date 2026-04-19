import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../constants/apiUrl.constant';

@Injectable({
  providedIn: 'root',
})
export class PatientManagementService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl = API_URL;

  constructor() {}

  getAllPatients(filters: any = {}) {
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get<any>(`${this.apiUrl.baseUrl}${this.apiUrl.patients}`, {
      params,
    });
  }

  getPatientById(patientId: string) {
    return this.http.get(
      `${this.apiUrl.baseUrl}${this.apiUrl.patients}/${patientId}`,
    );
  }
  createPatient(patientData: any) {
    return this.http.post(
      `${this.apiUrl.baseUrl}${this.apiUrl.patients}`,
      patientData,
    );
  }
  updatePatient(patientId: string, patientData: any) {
    return this.http.put(
      `${this.apiUrl.baseUrl}${this.apiUrl.patients}/${patientId}`,
      patientData,
    );
  }
  deletePatient(patientId: string) {
    return this.http.delete(
      `${this.apiUrl.baseUrl}${this.apiUrl.patients}/${patientId}`,
    );
  }
  exportPatientsCSV() {
    return this.http.get(
      `${this.apiUrl.baseUrl}${this.apiUrl.patients}/export`,
      { responseType: 'blob' },
    );
    // BLOBs (Binary Large Objects) are commonly used to store multimedia files, such as images, videos, and audio files, as well as other types of large data. In the context of web applications, BLOBs are often used to handle file uploads and downloads, allowing developers to manage and manipulate large files efficiently.
  }
  totalAppointmentCount() {
    return this.http.get(
      `${this.apiUrl.baseUrl}${this.apiUrl.patients}/appointmentCount/total`,
    );
  }

  totalPatientCount() {
    return this.http.get(
      `${this.apiUrl.baseUrl}${this.apiUrl.patients}/patientCount/total`,
    );
  }

}
