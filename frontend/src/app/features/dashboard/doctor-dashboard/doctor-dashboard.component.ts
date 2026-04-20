import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../core/services/appointment.service';
import { VisitService } from '../../../core/services/visit.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
})
export class DoctorDashboardComponent implements OnInit {

  private readonly appointmentService = inject(AppointmentService);
  private readonly visitService = inject(VisitService);
  private readonly router = inject(Router);

  // ================= APPOINTMENTS =================
  public appointments: any[] = [];
  public pagination: any;
  public pages: number[] = [];

  public selectedAppointment: any = null;
  public showStatusModal: boolean = false;
  public appointmentToUpdate: any = null;

  // ================= DOCTOR =================
  public currentDoctorId: number = 0;

  // ================= VISITS =================
  public visits: any[] = [];
  public doctorVisits: any[] = [];

  // ================= STATS =================
  public completedCount: number = 0;
  public pendingCount: number = 0;
  public totalCount: number = 0;

  constructor() {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');

    if (!storedId) {
      console.error('No userId found');
      return;
    }

    this.currentDoctorId = Number(storedId);

    this.loadAppointments();
    this.loadVisits();
  }

  // ================= APPOINTMENTS =================
  loadAppointments(): void {
    this.appointmentService.getAppointments({}).subscribe({
      next: (res: any) => {
        const data = res?.data || [];

        this.pagination = res?.pagination || {};

        this.appointments = data.filter(
          (a: any) => Number(a.doctor_id) === this.currentDoctorId
        );

        this.pages = Array.from(
          { length: this.pagination?.totalPages || 0 },
          (_, i) => i + 1
        );
      },
      error: (err) => {
        console.error(err);
        if (err.status === 401) this.router.navigateByUrl('');
      },
    });
  }

  // ================= VISITS =================
  loadVisits(): void {
    this.visitService.getVisits().subscribe({
      next: (res: any) => {
        const data = res?.data || res || [];

        this.visits = data;

        this.doctorVisits = data.filter(
          (v: any) => Number(v.doctor_id) === this.currentDoctorId
        );

        this.calculateStats();
      },
      error: (err) => console.error(err),
    });
  }

  // ================= STATS =================
  calculateStats(): void {
    this.totalCount = this.doctorVisits.length;

    this.completedCount = this.doctorVisits.filter(
      v => v.visit_status === 'Completed'
    ).length;

    this.pendingCount = this.doctorVisits.filter(
      v => v.visit_status === 'Draft'
    ).length;
  }

  // ================= UI ACTIONS =================
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
        this.loadVisits();
        this.closeStatusModal();
        this.closeDetails();
      },
      error: (err) => console.error(err),
    });
  }

  changePage(page: number) {
    this.loadAppointments();
  }
}