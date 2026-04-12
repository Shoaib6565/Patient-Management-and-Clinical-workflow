import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiNodeUrl;
  constructor(private http: HttpClient) {}

  router = inject(Router);

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
  
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }

}
