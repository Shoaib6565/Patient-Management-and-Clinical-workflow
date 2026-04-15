import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service.service';

@Component({
  selector: 'signin-com',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  showPassword = false;
  isLoading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      icon: 'email',
      toggle: false,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      icon: 'lock',
      toggle: true,
    },
  ];

  footerLinks = ['Privacy', 'Terms', 'Support'];

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe({
      next: (response: any) => {
      const token = response?.token;

      if (!token) {
        console.error('Token is not provided', response);
        this.isLoading = false;
        return;
      }

      this.authService.setToken(token);
      this.authService.currentUser().subscribe({
        next: (userRes: any) => {
          const user=userRes?.user;
          if (!user) {
            console.error('User data is not provided', userRes);
            this.isLoading = false;
            return;
          }
          console.log('Logged in user:', user);
          const role = user.roles[0].name;
          if (role === 'Admin') {
            this.router.navigate(['/dashboard/admin']);
          } else if (role === 'Doctor') {
            this.router.navigate(['/dashboard/doctor']);
            console.log('Doctor role detected, navigating to doctor dashboard');
          } else if (role === 'FDO') {
            this.router.navigate(['/dashboard/fdo']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
          this.isLoading = false;
        },
      });
      },
      error: (err) => {
        console.error('Login error:', err);
        this.isLoading = false;
      },
    });
  }
}