import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../constants/apiUrl.constant';


@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl = API_URL;

  constructor() {}

  getAllUsers() {
    return this.http.get<any>(
      `${this.apiUrl.baseUrl}${this.apiUrl.users}`,
    );
  }
  getUserById(userId: string) {
    return this.http.get(
      `${this.apiUrl.baseUrl}${this.apiUrl.users}/${userId}`,
    );
  }
  createUser(userData: any) {
    return this.http.post(
      `${this.apiUrl.baseUrl}${this.apiUrl.users}`,
      userData,
    );
  }
  updateUser(userId: string, userData: any) {
    return this.http.put(
      `${this.apiUrl.baseUrl}${this.apiUrl.users}/${userId}`,
      userData,
    );
  }
  deleteUser(userId: string) {
    return this.http.delete(
      `${this.apiUrl.baseUrl}${this.apiUrl.users}/${userId}`,
    );
  }
  resetPassword(userId: string, newPassword: string) {
    return this.http.post(
      `${this.apiUrl.baseUrl}${this.apiUrl.users}/reset-password/${userId}`,
      { new_password: newPassword },
    );
  }
  getActiveDoctorCount() {
    return this.http.get(
      `${this.apiUrl.baseUrl}${this.apiUrl.users}/active-doctors/count`,
    );
  }
}
