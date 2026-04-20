import { HttpClient } from "@angular/common/http";
import { Injectable ,inject } from "@angular/core";
import { API_URL } from "../constants/apiUrl.constant";
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  router = inject(Router);
  private readonly apiUrl = API_URL;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  public setName(name: string): void {
    localStorage.setItem('userName', name);
  }


  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.isLoggedInSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }


  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.role || null;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  hasRole(requiredRole: string): boolean {
    const userRole = this.getRole();
    return userRole === requiredRole;
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl.baseUrl}${this.apiUrl.auth}/login`, { email, password });
  }

  logout() {
    this.removeToken();
    localStorage.removeItem('userName');
    this.router.navigate(['/signin']);
    return this.http.post(`${this.apiUrl.baseUrl}${this.apiUrl.auth}/logout`, {});
  }

  currentUser() {
    return this.http.get(`${this.apiUrl.baseUrl}${this.apiUrl.auth}/me`);
  }
}
