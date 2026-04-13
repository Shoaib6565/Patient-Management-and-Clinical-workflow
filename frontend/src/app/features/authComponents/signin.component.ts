import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule,NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'signin-com',
  imports: [FormsModule, NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  authServices = inject(AuthService);
  router = inject(Router)

  showPassword: boolean = false;
  isLoading: boolean = false;


  loginFail : string|null = null;
  userDetail: any;
  onLogin(value: NgForm){
    console.log(value);
    this.userDetail = value;
    const {email,password} = this.userDetail;
    console.log('email:',email, 'password:',password)

        this.authServices.login(email, password).subscribe({
      next: (res) => {
        console.log('Login Response:', res);

        // store JWT token in localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        const role = res.role;

        alert('Login Successful');

        if(role == 'Admin'){
          this.router.navigate(['/admin-dashboard']);
        }
        if(role == 'FDO'){
          this.router.navigate(['/fdo-dashboard']);
        }
        if(role == 'Doctor'){
          this.router.navigate(['/doctor-dashboard']);
        }
      },
      error: (err) => {
        console.error('Login Error:', err);
        this.loginFail
        alert(err.error?.message || 'Login Failed');
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }








  // onLogin(): void {
  //   if (!this.email || !this.password) return;
  //   this.isLoading = true;
  //   setTimeout(() => {
  //     this.isLoading = false;
  //     console.log('Login attempted', {
  //       email: this.email,
  //     });
  //   }, 5000);
  // }


}
