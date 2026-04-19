import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientManagementService } from '../../../core/services/PatientManagement.service';

@Component({
  selector: 'app-patient-history',
  imports: [CommonModule],
  templateUrl: './patient-history.component.html',
  styleUrl: './patient-history.component.css'
})
export class PatientHistoryComponent {
 private readonly patientService = inject(PatientManagementService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  patient: any = null;
  appointmentId: string = '';
  loading = false;

  constructor() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.appointmentId = params['id'];
        this.loadPatientByAppointment();
      }
    });
  }

  loadPatientByAppointment() {
    if (!this.appointmentId) return;

    this.loading = true;

    this.patientService.getPatientByAppointmentId(this.appointmentId)
      .subscribe({
        next: (res: any) => {
          this.patient = res?.data || null;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading patient:', err);
          this.loading = false;

          if (err.status === 401) {
            this.router.navigateByUrl('');
          }
        }
      });
  }
}
