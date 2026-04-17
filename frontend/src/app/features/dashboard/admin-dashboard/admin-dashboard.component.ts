import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { PatientManagementService } from '../../../core/services/PatientManagement.service';
import { UserManagementService } from '../../../core/services/userManagement.service';
import { CasesService } from '../../../core/services/Cases.service';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  private readonly patientManagementService = inject(PatientManagementService);
  private readonly userManagementService = inject(UserManagementService);
  private readonly casesService = inject(CasesService);

  totalPatients = 0;
  totalDoctors = 0;
  totalAppointments = 0;
  totalCases = 0;

  ngOnInit() {
    this.loadDashboardData();
  }

  ngAfterViewInit() {
    this.renderCharts();
  }

  private loadDashboardData() {
    this.patientManagementService
      .totalAppointmentCount()
      .subscribe((res: any) => {
        this.totalAppointments = res.data.totalAppointments;
      });

    this.userManagementService.getActiveDoctorCount().subscribe((res: any) => {
      this.totalDoctors = res.data.count;
    });

    this.casesService.getCaseCount().subscribe((res: any) => {
      this.totalCases = res.totalCases;
    });

    this.patientManagementService.totalPatientCount().subscribe((res: any) => {
      this.totalPatients = res.data.totalPatients;
    });
  }

  private renderCharts() {
    new Chart('appointmentChart', {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Appointments',
            data: [30, 45, 80, 60, 90, 40, 55],
            backgroundColor: '#3b82f6',
            barThickness: 40,
            maxBarThickness: 50,
          },
        ],
      },
    });

    new Chart('visitTypeChart', {
      type: 'pie',
      data: {
        labels: ['General', 'Specialist', 'Emergency', 'Diagnostic'],
        datasets: [
          {
            data: [45, 32, 15, 8],
            backgroundColor: ['#60a5fa', '#34d399', '#f87171', '#fbbf24'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}
