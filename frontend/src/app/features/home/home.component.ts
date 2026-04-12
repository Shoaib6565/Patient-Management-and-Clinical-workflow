import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  constructor(private router: Router) {}

  features: Feature[] = [
    {
      icon: 'patients',
      title: 'Patient Records',
      description: 'Centralized, HIPAA-compliant patient profiles with full medical history at your fingertips.',
    },
    {
      icon: 'appointments',
      title: 'Appointment Scheduling',
      description: 'Smart calendar management with automated reminders and real-time availability.',
    },
    {
      icon: 'analytics',
      title: 'Clinical Analytics',
      description: 'Data-driven insights and reporting to improve patient outcomes and operational efficiency.',
    },
    {
      icon: 'security',
      title: 'Secure & Compliant',
      description: 'End-to-end encryption with HIPAA, GDPR, and SOC 2 compliance built in from day one.',
    },
  ];

  stats: Stat[] = [
    { value: '50K+', label: 'Patients Managed' },
    { value: '99.9%', label: 'Uptime Guaranteed' },
    { value: '300+', label: 'Clinics Onboarded' },
    { value: '4.9★', label: 'Average Rating' },
  ];

  goToSignIn(): void {
    this.router.navigate(['/signin']);
  }
}
