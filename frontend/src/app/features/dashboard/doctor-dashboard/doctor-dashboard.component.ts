import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../core/services/appointment.service';
@Component({
  selector: 'app-doctor-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
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
  const userString = localStorage.getItem('user') || localStorage.getItem('currentUser');
  if (!userString) {
    return;
  }

  try {
    const parsedUser = JSON.parse(userString);
    this.currentDoctorId = parsedUser.id ?? parsedUser.userId ?? 0;
  } catch {
    this.currentDoctorId = 0;
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

  trackByAppointment(index: number, appointment: any) {
    return appointment?.id ?? index;
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



































// // src/app/features/dashboard/doctor-dashboard/doctor-dashboard.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';

// export type AppointmentStatus = 'CheckedIn' | 'Waiting' | 'Scheduled' | 'Urgent' | 'Completed';

// export interface TodayAppointment {
//   id: string;
//   patientName: string;
//   caseId: string;
//   time: string;
//   purpose: string;
//   status: AppointmentStatus;
//   avatarInitials: string;
// }

// export interface ScheduleItem {
//   dayShort: string;
//   dayNum: number;
//   title: string;
//   timeRange: string;
//   isEmpty?: boolean;
// }

// export interface BottomStat {
//   icon: string;
//   label: string;
//   value: string;
//   colorClass: string;
// }

// @Component({
//   selector: 'app-doctor-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './doctor-dashboard.component.html',
//   styleUrls: ['./doctor-dashboard.component.css'],
// })
// export class DoctorDashboardComponent implements OnInit {
//   userName = localStorage.getItem('userName') || 'Dr. Smith';

//   doctorName     = this.userName;
//   today          = new Date();
//   totalAppts     = 12;
//   visitsCompleted = 8;
//   pendingVisits  = 4;

//   get visitsProgress(): number {
//     return Math.round((this.visitsCompleted / this.totalAppts) * 100);
//   }

//   // ── Today's Appointments 
//   appointments: TodayAppointment[] = [
//     {
//       id: '1', patientName: 'Elena Rodriguez', caseId: '#CS-8892',
//       time: '09:15 AM', purpose: 'Post-Op Consultation',
//       status: 'CheckedIn', avatarInitials: 'ER',
//     },
//     {
//       id: '2', patientName: 'Marcus Thorne', caseId: '#CS-9120',
//       time: '10:30 AM', purpose: 'Routine Cardiac Check',
//       status: 'Waiting', avatarInitials: 'MT',
//     },
//     {
//       id: '3', patientName: 'Sarah Jenkins', caseId: '#CS-7721',
//       time: '11:45 AM', purpose: 'Blood Work Review',
//       status: 'Scheduled', avatarInitials: 'SJ',
//     },
//     {
//       id: '4', patientName: 'Julian Voss', caseId: '#CS-6543',
//       time: '02:15 PM', purpose: 'General Health Screen',
//       status: 'Urgent', avatarInitials: 'JV',
//     },
//   ];

//   // ── Weekly Schedule 
//   weeklySchedule: ScheduleItem[] = [
//     { dayShort: 'TUE', dayNum: 24, title: 'Cardiology Review',  timeRange: '09:00 AM – 11:30 AM' },
//     { dayShort: 'WED', dayNum: 25, title: 'Department Seminar', timeRange: '02:00 PM – 04:00 PM' },
//     { dayShort: 'THU', dayNum: 26, title: '',                   timeRange: '',                    isEmpty: true },
//   ];

//   // ── Bottom Stats
//   bottomStats: BottomStat[] = [
//     { icon: 'ti-chart-bar',     label: 'PATIENT VELOCITY',  value: '+12% from last week',  colorClass: 'stat-blue'   },
//     { icon: 'ti-shield-check',  label: 'SATISFACTION RATE', value: '98.4% Exceptional',    colorClass: 'stat-teal'   },
//     { icon: 'ti-clipboard-list',label: 'PENDING CHARTS',    value: '3 records required',   colorClass: 'stat-orange' },
//   ];

//   ngOnInit(): void {}

//   // ── Helpers
//   getStatusLabel(status: AppointmentStatus): string {
//     const map: Record<AppointmentStatus, string> = {
//       CheckedIn: 'Checked In', Waiting: 'Waiting',
//       Scheduled: 'Scheduled',  Urgent: 'Urgent', Completed: 'Completed',
//     };
//     return map[status];
//   }

//   getStatusClass(status: AppointmentStatus): string {
//     const map: Record<AppointmentStatus, string> = {
//       CheckedIn: 'badge-checkedin',
//       Waiting:   'badge-waiting',
//       Scheduled: 'badge-scheduled',
//       Urgent:    'badge-urgent',
//       Completed: 'badge-completed',
//     };
//     return map[status];
//   }

//   isPrimaryAction(status: AppointmentStatus): boolean {
//     return status === 'CheckedIn';
//   }

//   getActionLabel(status: AppointmentStatus): string {
//     return status === 'CheckedIn' ? 'Start Visit' : 'Check-in';
//   }

//   onNewEmergencyCase(): void {
//     console.log('New emergency case clicked');
//     // this.router.navigate(['/cases/new-emergency']);
//   }

//   onStartVisit(appt: TodayAppointment): void {
//     console.log('Start visit for', appt.patientName);
//     // open visit form
//   }

//   onCheckIn(appt: TodayAppointment): void {
//     console.log('Check in', appt.patientName);
//   }

//   onFilter(): void   { console.log('Filter appointments'); }
//   onPrint(): void    { window.print(); }
//   onMoreSchedule(): void { console.log('More schedule options'); }
// }


















































