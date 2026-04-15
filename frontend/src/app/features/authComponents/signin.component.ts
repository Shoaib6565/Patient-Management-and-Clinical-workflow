import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule,NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth-service.service';

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
        // this.authServices.setToken(res.token);
         const role =   this.authServices.getRole();;



        alert('Login Successful');

        if(role == 'Admin'){
          this.router.navigate(['/admin']);
        }
        if(role == 'FDO'){
          this.router.navigate(['/fdo']);
        }
        if(role == 'Doctor'){
          this.router.navigate(['/doctor']);
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







}
