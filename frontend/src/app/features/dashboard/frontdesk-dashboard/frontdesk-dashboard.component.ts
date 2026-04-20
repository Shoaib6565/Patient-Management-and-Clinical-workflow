
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export type AppointmentStatus =
  | 'IN_PROGRESS'
  | 'ARRIVED'
  | 'ACTION_REQUIRED'
  | 'CONFIRMED'
  | 'SCHEDULED'
  | 'COMPLETED';

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
  timeLabel?: string;       // e.g. 'ONGOING' | 'LATE'
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

  // ── Stat Cards
  statCards: StatCard[] = [
    {
      label: 'NEW PATIENTS',
      value: 12,
      subtext: '+15% from avg',
      subtextType: 'positive',
      icon: 'person_add',
    },
    {
      label: "TODAY'S APPS",
      value: 24,
      subtext: '8 completed / 16 remaining',
      subtextType: 'neutral',
      icon: 'calendar_today',
    },
  ];

  // ── Doctor Availability
  doctors: DoctorAvailability[] = [
    { name: 'Dr. Aris',   status: 'available',  statusLabel: 'Avail.'   },
    { name: 'Dr. Miller', status: 'surgery',    statusLabel: 'Surgery'  },
    { name: 'Dr. Lee',    status: 'onduty',     statusLabel: 'On Duty'  },
  ];

  // ── Daily Agenda
  appointments: Appointment[] = [
    {
      time: '9:00 AM',
      timeLabel: 'ONGOING',
      timeLabelType: 'ongoing',
      patientName: 'Eleanor Shellstrop',
      patientInitial: 'ES',
      visitType: 'General Consultation',
      room: 'Room 102',
      status: 'IN_PROGRESS',
    },
    {
      time: '9:30 AM',
      patientName: 'Michael Realman',
      patientInitial: 'MR',
      visitType: 'Follow-up: Cardiology',
      room: 'Room 204',
      status: 'ARRIVED',
    },
    {
      time: '10:15 AM',
      timeLabel: 'LATE',
      timeLabelType: 'late',
      patientName: 'Chidi Anagonye',
      patientInitial: 'CA',
      visitType: 'Emergency Referral',
      room: 'Triage 1',
      status: 'ACTION_REQUIRED',
      isLate: true,
    },
    {
      time: '11:00 AM',
      patientName: 'Tahani Al-Jamil',
      patientInitial: 'TA',
      visitType: 'Dermatology Scan',
      room: 'Room 305',
      status: 'CONFIRMED',
    },
    {
      time: '11:30 AM',
      patientName: 'Jason Mendoza',
      patientInitial: 'JM',
      visitType: 'Post-Op Check',
      room: 'Room 108',
      status: 'SCHEDULED',
    },
    {
      time: '12:00 PM',
      patientName: 'Janet Chen',
      patientInitial: 'JC',
      visitType: 'Blood Work Review',
      room: 'Lab 2',
      status: 'SCHEDULED',
    },
  ];

  // ── Documents
  documents: Document[] = [
    {
      name: 'Lab_Results_Michael_R.pdf',
      description: 'Ready for Review',
      type: 'pdf',
      urgency: 'danger',
    },
    {
      name: 'Insurance_Auth_Eleanor.doc',
      description: 'Pending Signature',
      type: 'doc',
      urgency: 'normal',
    },
    {
      name: 'Incomplete_Reg_Janet.form',
      description: 'Missing Address',
      type: 'form',
      urgency: 'warning',
    },
  ];

  ngOnInit(): void {}

  router = inject(Router)

  // ── Helpers ─
  getStatusLabel(status: AppointmentStatus): string {
    const map: Record<AppointmentStatus, string> = {
      IN_PROGRESS:     'In Progress',
      ARRIVED:         'Arrived',
      ACTION_REQUIRED: 'Action Required',
      CONFIRMED:       'Confirmed',
      SCHEDULED:       'Scheduled',
      COMPLETED:       'Completed',
    };
    return map[status];
  }

  getStatusClass(status: AppointmentStatus): string {
    const map: Record<AppointmentStatus, string> = {
      IN_PROGRESS:     'status-inprogress',
      ARRIVED:         'status-arrived',
      ACTION_REQUIRED: 'status-action',
      CONFIRMED:       'status-confirmed',
      SCHEDULED:       'status-scheduled',
      COMPLETED:       'status-completed',
    };
    return map[status];
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
