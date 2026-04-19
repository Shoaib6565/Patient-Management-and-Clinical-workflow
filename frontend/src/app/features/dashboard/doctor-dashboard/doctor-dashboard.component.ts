import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../core/services/appointment.service';
@Component({
  selector: 'app-doctor-dashboard',
 imports: [CommonModule, FormsModule],
 templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {

private readonly appointmentService = inject(AppointmentService);
  private readonly router = inject(Router);

  public appointments: any[] = [];
  public pagination: any;
  public pages: number[] = [];

  public selectedAppointment: any = null;

  public showStatusModal: boolean = false;
  public appointmentToUpdate: any = null;

 public currentDoctorId: number = 0;

constructor() {
  this.getCurrentDoctor();
}
ngOnInit() {
  this.loadAppointments();
}
getCurrentDoctor() {
  const user = localStorage.getItem('user');

  console.log('RAW USER:', user);

  if (user) {
    const parsedUser = JSON.parse(user);
    console.log('PARSED USER:', parsedUser);
  }
}

loadAppointments() {
  this.appointmentService.getAppointments({}).subscribe({
    next: (res: any) => {

      const data = res?.data ?? res ?? [];

      this.pagination = res?.pagination || {};

      this.appointments = data.filter((app: any) =>
        Number(app.doctor_id) === Number(this.currentDoctorId)
      );
      console.log('ALL APPOINTMENTS:', data);
console.log('CURRENT DOCTOR ID:', this.currentDoctorId);

      this.pages = Array.from(
        { length: this.pagination?.totalPages || 0 },
        (_, i) => i + 1
      );
    },
    error: (err) => {
      console.error('Error loading appointments:', err);
      if (err.status === 401) {
        this.router.navigateByUrl('');
      }
    }
  });
}
  selectAppointment(app: any) {
    this.selectedAppointment = app;
  }

  closeDetails() {
    this.selectedAppointment = null;
  }

  openStatusModal(app: any) {
    this.appointmentToUpdate = app;
    this.showStatusModal = true;
  }

  closeStatusModal() {
    this.showStatusModal = false;
    this.appointmentToUpdate = null;
  }

  updateStatus(status: string) {
    if (!this.appointmentToUpdate?.id) return;

    this.appointmentService.updateStatus(
      this.appointmentToUpdate.id,
      { status }
    ).subscribe({
      next: () => {
        this.loadAppointments();
        this.closeStatusModal();
        this.closeDetails();
      },
      error: (err) => {
        console.error('Status update failed:', err);
      }
    });
  }

  changePage(page: number) {
    this.loadAppointments();
  }
}

