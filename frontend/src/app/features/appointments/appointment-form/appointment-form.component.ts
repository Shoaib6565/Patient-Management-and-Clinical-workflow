
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppointmentService } from '../../../core/services/appointment.service';
import { PracticeLocationService } from '../../../core/services/practice-location.service';
import { SpecialtyService } from '../../../core/services/specialty.service';
import { CasesService } from '../../../core/services/Cases.service';
import { PatientManagementService } from '../../../core/services/PatientManagement.service';
import { UserManagementService } from '../../../core/services/userManagement.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './appointment-form.component.html'
})
export class AppointmentFormComponent implements OnInit, OnDestroy {

  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();
  constructor(
    private appointmentService: AppointmentService,
    private locationService: PracticeLocationService,
    private specialtyService: SpecialtyService,
    private casesService: CasesService,
    private patientService: PatientManagementService,
    private userService: UserManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  isEdit = false;
  isLoading = false;
  id: any;

  patients: any[] = [];
  allPatients: any[] = [];

  cases: any[] = [];
  allCases: any[] = [];

  specialties: any[] = [];
  allSpecialties: any[] = [];

  locations: any[] = [];
  allLocations: any[] = [];

  doctors: any[] = [];
  allDoctors: any[] = [];

  //safe response handler
  private extractArray(res: any): any[] {
    return Array.isArray(res)
      ? res
      : Array.isArray(res?.data)
      ? res.data
      : Array.isArray(res?.data?.patients)
      ? res.data.patients
      : [];
  }

  form = this.fb.group({
    case_id: ['', Validators.required],
    patient_id: ['', Validators.required],
    doctor_id: ['', Validators.required],
    specialty_id: ['', Validators.required],
    practice_location_id: ['', Validators.required],
    appointment_date: ['', Validators.required],
    appointment_time: ['', Validators.required],
    appointment_type: ['', Validators.required],
    duration_minutes: [30, Validators.required],
    reason_for_visit: ['', Validators.required],
    appointment_status: ['Scheduled', Validators.required],
    notes: ['']
  });

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = !!this.id;
    this.loadInitialData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadInitialData() {
    forkJoin({
      specialties: this.specialtyService.getSpecialties('', 'all', 1, 1000),
      locations: this.locationService.getAll(),
      doctors: this.userService.getAllUsers(),
      patients: this.patientService.getAllPatients({ limit: 1000 }),
      cases: this.casesService.getAllCases({ limit: 1000 })
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (results: any) => {

        this.allSpecialties = this.extractArray(results.specialties);
        this.specialties = [...this.allSpecialties];

        this.allLocations = this.extractArray(results.locations);
        this.locations = [...this.allLocations];

        this.allDoctors = this.extractArray(results.doctors)
          .filter((u: any) => u.roles?.[0]?.name === 'Doctor');
        this.doctors = [...this.allDoctors];

        this.allPatients = this.extractArray(results.patients);
        this.patients = [...this.allPatients];

        this.allCases = this.extractArray(results.cases);
        this.cases = [...this.allCases];
        console.log('allcases: ----->',this.allCases);

        if (this.isEdit) {
          this.loadAppointment();
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Init load error:', err);
        this.isLoading = false;
      }
    });
  }

  loadAppointment() {
    this.appointmentService.getAppointmentById(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          const d = res.data;

          this.form.patchValue({
            case_id: d.case_id,
            patient_id: d.patient_id,
            doctor_id: d.doctor_id,
            specialty_id: d.specialty_id,
            practice_location_id: d.practice_location_id,
            appointment_date: d.appointment_date?.split('T')[0],
            appointment_time: d.appointment_time?.substring(0, 5),
            appointment_type: d.appointment_type,
            duration_minutes: d.duration_minutes || 30,
            reason_for_visit: d.reason_for_visit,
            appointment_status: d.status || 'Scheduled',
            notes: d.notes
          });

          this.isLoading = false;
        },
        error: (err) => {
          console.error('Appointment load error:', err);
          this.isLoading = false;
        }
      });
  }



  searchPatients(e: any) {
    const val = e.target?.value?.toLowerCase() || '';
    this.patients = this.allPatients.filter(p =>
      (p.first_name + ' ' + p.last_name).toLowerCase().includes(val)
    );
  }

  searchCases(e: any) {
    const val = e.target?.value?.toLowerCase() || '';
    this.cases = this.allCases.filter(c =>
      (c.case_number || '').toLowerCase().includes(val)
    );
  }

  searchDoctors(e: any) {
    const val = e.target?.value?.toLowerCase() || '';
    this.doctors = this.allDoctors.filter(d =>
      (d.first_name + ' ' + d.last_name).toLowerCase().includes(val)
    );
  }

  searchSpecialties(e: any) {
    const val = e.target?.value?.toLowerCase() || '';
    this.specialties = this.allSpecialties.filter(s =>
      (s.specialty_name || s.name || '').toLowerCase().includes(val)
    );
  }

  searchLocations(e: any) {
    const val = e.target?.value?.toLowerCase() || '';
    this.locations = this.allLocations.filter(l =>
      (l.location_name || l.name || '').toLowerCase().includes(val)
    );
  }

  onDoctorChange(doctorId: string) {
  if (!doctorId) {
    this.specialties = [...this.allSpecialties];
    this.locations = [...this.allLocations];
    return;
  }

  const doctor = this.allDoctors.find(d => d.id == doctorId);

  // optional filtering logic
  if (doctor?.specialties) {
    this.specialties = doctor.specialties;
  }

  if (doctor?.practice_locations) {
    this.locations = doctor.practice_locations;
  }
}

onSpecialtyChange(specialtyId: string) {
  console.log('Specialty changed:', specialtyId);
}


  submit() {
    if (this.form.invalid) return;

    this.isLoading = true;

    const payload = {
      ...this.form.value,
      status: this.form.value.appointment_status,
      created_by: localStorage.getItem('userId')
    };
    delete payload.appointment_status;

    const req = this.isEdit
      ? this.appointmentService.updateAppointment(this.id, payload)
      : this.appointmentService.createAppointment(payload);

    req.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/appointments']);
      },
      error: (err) => {
        console.error('Save error:', err);
        this.isLoading = false;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/appointments']);
  }
}
