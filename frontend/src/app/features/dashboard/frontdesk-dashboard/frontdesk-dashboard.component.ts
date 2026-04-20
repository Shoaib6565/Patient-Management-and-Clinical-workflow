
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../core/services/appointment.service';
import { PatientManagementService } from '../../../core/services/PatientManagement.service';
import { UserManagementService } from '../../../core/services/userManagement.service';

export type AppointmentStatus =
  | 'IN_PROGRESS'
  | 'ARRIVED'
  | 'ACTION_REQUIRED'
  | 'CONFIRMED'
  | 'SCHEDULED'
  | 'COMPLETED'
  | 'CHECKED_IN'
  | 'CANCELLED'
  | 'NO_SHOW';

export type DoctorStatus = 'available' | 'surgery' | 'onduty' | 'unavailable';
export type DocFileType = 'pdf' | 'doc' | 'form';
export type DocUrgency = 'normal' | 'warning' | 'danger';

export interface StatCard {
  label: string;
  value: number | string;
  subtext: string;
  subtextType: 'positive' | 'neutral' | 'negative';
  icon: string;
}

export interface DoctorAvailability {
  name: string;
  status: DoctorStatus;
  statusLabel: string;
}

export interface Appointment {
  time: string;
  timeLabel?: string;       //  'ONGOING' | 'LATE'
  timeLabelType?: 'ongoing' | 'late';
  patientName: string;
  patientInitial: string;
  patientAvatar?: string;
  visitType: string;
  room: string;
  status: AppointmentStatus;
  isLate?: boolean;
}

export interface Document {
  name: string;
  description: string;
  type: DocFileType;
  urgency: DocUrgency;
}

@Component({
  selector: 'app-frontdesk-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frontdesk-dashboard.component.html',
  styleUrls: ['./frontdesk-dashboard.component.css'],
})
export class FrontdeskDashboardComponent implements OnInit {
  userName = localStorage.getItem('userName') || 'Front Desk Staff';
  currentDate = new Date();

  // Stat Cards
  statCards: StatCard[] = [
    {
      label: 'NEW PATIENTS',
      value: 0,
      subtext: 'Loading…',
      subtextType: 'neutral',
      icon: 'person_add',
    },
    {
      label: 'TOTAL APPTS',
      value: 0,
      subtext: 'Loading…',
      subtextType: 'neutral',
      icon: 'calendar_today',
    },
  ];

  // Doctor Availability
  activeDoctorsCount = 0;

  //  Daily Agenda
  appointments: Appointment[] = [];

  // Documents
  documents: Document[] = [];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private readonly appointmentService = inject(AppointmentService);
  private readonly patientService = inject(PatientManagementService);
  private readonly userService = inject(UserManagementService);
  router = inject(Router)

  private loadDashboardData(): void {
    const today = this.getTodayIsoDate();
    this.loadNewPatients(today);
    this.loadTodayAppointments(today);
    this.loadTotalAppointments();
    this.loadActiveDoctors();
  }

  private getTodayIsoDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private extractArray(res: any): any[] {
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.data)) return res.data.data;
    if (Array.isArray(res?.data?.patients)) return res.data.patients;
    return [];
  }

  private loadNewPatients(date: string): void {
    this.patientService
      .getAllPatients({ reg_from: date, reg_to: date, limit: 1000 })
      .subscribe({
        next: (res: any) => {
          const patients = this.extractArray(res);
          const count = patients.length;
          const card = this.statCards.find(c => c.label === 'NEW PATIENTS');
          if (card) {
            card.value = count;
            card.subtext = count > 0 ? `${count} registered today` : 'No new registrations';
            card.subtextType = count > 0 ? 'positive' : 'neutral';
          }
        },
        error: (err) => {
          console.error('New patient count error:', err);
          const card = this.statCards.find(c => c.label === 'NEW PATIENTS');
          if (card) {
            card.value = 0;
            card.subtext = 'Unable to load';
            card.subtextType = 'negative';
          }
        }
      });
  }

  private loadTodayAppointments(date: string): void {
    this.appointmentService.getAppointments({ start_date: date, end_date: date, page: 1 }).subscribe({
      next: (res: any) => {
        const data = this.extractArray(res);
        this.appointments = data.map((app: any) => this.mapAppointment(app));
      },
      error: (err) => {
        console.error('Today appointments error:', err);
        this.appointments = [];
      }
    });
  }

  private loadTotalAppointments(): void {
    this.appointmentService.getTotalAppointments().subscribe({
      next: (res: any) => {
        const count = res?.data?.total_appointments ?? 0;
        const card = this.statCards.find(c => c.label === 'TOTAL APPTS');
        if (card) {
          card.value = count;
          card.subtext = count === 1 ? 'Appointment recorded' : 'Appointments recorded';
          card.subtextType = count > 0 ? 'positive' : 'neutral';
        }
      },
      error: (err) => {
        console.error('Total appointments load error:', err);
        const card = this.statCards.find(c => c.label === 'TOTAL APPTS');
        if (card) {
          card.value = 0;
          card.subtext = 'Unable to load';
          card.subtextType = 'negative';
        }
      }
    });
  }

  private loadActiveDoctors(): void {
    this.userService.getActiveDoctorCount().subscribe({
      next: (res: any) => {
        this.activeDoctorsCount = res?.data?.count ?? 0;
      },
      error: (err) => {
        console.error('Active doctors load error:', err);
        this.activeDoctorsCount = 0;
      }
    });
  }

  private mapAppointment(app: any): Appointment {
    const patientName = [app.patient?.first_name, app.patient?.last_name]
      .filter(Boolean)
      .join(' ') || app.patient?.name || 'Unknown';
    const patientInitial = patientName
      .split(' ')
      .map((part: string) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'NA';
    const appointmentTime = String(app.appointment_time || '').substring(0, 5) || '';
    const normalizedStatus = this.normalizeStatus(app.status);
    const isLate = normalizedStatus === 'SCHEDULED' && this.isToday(app.appointment_date) && this.isAppointmentLate(appointmentTime);

    return {
      time: appointmentTime || 'TBD',
      timeLabel: normalizedStatus === 'IN_PROGRESS' ? 'ONGOING' : isLate ? 'LATE' : undefined,
      timeLabelType: normalizedStatus === 'IN_PROGRESS' ? 'ongoing' : isLate ? 'late' : undefined,
      patientName,
      patientInitial,
      visitType: app.appointment_type || app.reason_for_visit || app.specialty?.specialty_name || 'Consultation',
      room: app.practiceLocation?.location_name || app.practiceLocation?.name || app.practiceLocation?.location_name || app.doctor?.name || 'TBD',
      status: normalizedStatus,
      isLate,
    };
  }

  private normalizeStatus(status: any): AppointmentStatus {
    const raw = String(status || '').trim().toUpperCase().replace(/\s+/g, '_');
    const valid: AppointmentStatus[] = [
      'IN_PROGRESS',
      'ARRIVED',
      'ACTION_REQUIRED',
      'CONFIRMED',
      'SCHEDULED',
      'COMPLETED',
      'CHECKED_IN',
      'CANCELLED',
      'NO_SHOW',
    ];
    return valid.includes(raw as AppointmentStatus) ? (raw as AppointmentStatus) : 'SCHEDULED';
  }

  private isToday(dateString: string): boolean {
    const today = this.getTodayIsoDate();
    return String(dateString).startsWith(today);
  }

  private isAppointmentLate(timeString: string): boolean {
    if (!timeString) return false;
    const [hour, minute] = timeString.split(':').map(Number);
    const now = new Date();
    const appointment = new Date(now);
    appointment.setHours(hour, minute, 0, 0);
    return now > appointment;
  }

  // ── Helpers ─
  getStatusLabel(status: AppointmentStatus): string {
    const map: Record<AppointmentStatus, string> = {
      IN_PROGRESS:     'In Progress',
      ARRIVED:         'Arrived',
      ACTION_REQUIRED: 'Action Required',
      CONFIRMED:       'Confirmed',
      SCHEDULED:       'Scheduled',
      COMPLETED:       'Completed',
      CHECKED_IN:      'Checked In',
      CANCELLED:       'Cancelled',
      NO_SHOW:         'No Show',
    };
    return map[status] ?? String(status);
  }

  getStatusClass(status: AppointmentStatus): string {
    const map: Record<AppointmentStatus, string> = {
      IN_PROGRESS:     'status-inprogress',
      ARRIVED:         'status-arrived',
      ACTION_REQUIRED: 'status-action',
      CONFIRMED:       'status-confirmed',
      SCHEDULED:       'status-scheduled',
      COMPLETED:       'status-completed',
      CHECKED_IN:      'status-arrived',
      CANCELLED:       'status-cancelled',
      NO_SHOW:         'status-error',
    };
    return map[status] ?? 'status-scheduled';
  }

  getDoctorStatusClass(status: DoctorStatus): string {
    const map: Record<DoctorStatus, string> = {
      available:   'doc-available',
      surgery:     'doc-surgery',
      onduty:      'doc-onduty',
      unavailable: 'doc-unavailable',
    };
    return map[status];
  }

  getDocIconClass(urgency: DocUrgency): string {
    const map: Record<DocUrgency, string> = {
      normal:  'doc-icon-normal',
      warning: 'doc-icon-warning',
      danger:  'doc-icon-danger',
    };
    return map[urgency];
  }

  onRegisterNewPatient(): void {

    console.log('Register new patient clicked');
    this.router.navigate(['/patients/patient-form']);
  }

  onScheduleAppointment(): void {
    console.log('Schedule appointment clicked');
    this.router.navigate(['/appointments/create']);
  }

  onViewAllDocuments(): void {
    console.log('View all documents');
    // this.router.navigate(['/documents']);
  }

  onFilterAgenda(): void {
    console.log('Filter agenda');
  }

  onPrintAgenda(): void {
    window.print();
  }

  onAppointmentClick(appt: Appointment): void {
    console.log('Appointment clicked:', appt.patientName);
  }
}
