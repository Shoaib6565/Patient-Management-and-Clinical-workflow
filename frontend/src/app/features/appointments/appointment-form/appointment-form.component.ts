// appointment-form.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppointmentService } from '../../../core/services/appointment.service';
import { PracticeLocationService } from '../../../core/services/practice-location.service';
import { SpecialtyService } from '../../../core/services/specialty.service';
import { CasesService } from './../../../core/services/Cases.service';
import { PatientManagementService } from '../../../core/services/PatientManagement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {

    constructor(
    // private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private locationService: PracticeLocationService,
    private specialtyService: SpecialtyService,
    private casesService: CasesService,
    private patientService: PatientManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  fb = inject(FormBuilder);
  isEdit = false;
  id: any;

  patients: any[] = [];
  cases: any[] = [];
  specialties: any[] = [];
  locations: any[] = [];

  form = this.fb.group({
    case_id: ['', Validators.required],
    patient_id: ['', Validators.required],
    doctor_id: ['', Validators.required],
    specialty_id: ['', Validators.required],
    practice_location_id: ['', Validators.required],
    appointment_date: ['', Validators.required],
    appointment_time: ['', Validators.required],
    duration_minutes: [30],
    appointment_type: ['', Validators.required],
    status: ['Scheduled'],
    reminder_method: [''],
    reason_for_visit: ['', Validators.required],
    notes: ['']
  });



  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = !!this.id;

    this.loadDropdowns();

    if (this.isEdit) {
      this.appointmentService.getAppointmentById(this.id).subscribe((res: any) => {
        this.form.patchValue(res.data);
      });
    }
  }

  loadDropdowns() {
    this.specialtyService.getSpecialties().subscribe((res: any) => this.specialties = res.data);
    this.locationService.getAll().subscribe((res: any) => this.locations = res.data);
  }

  searchPatients(event: any) {
    this.patientService.getAllPatients(event.target.value)
      .subscribe((res: any) => this.patients = res.data);
  }

  searchCases(event: any) {
    this.casesService.getAllCases() // inside bracket  event.target.value
      .subscribe((res: any) => this.cases = res.data);
  }

  cancel() {
    this.router.navigate(['/appointments']);
  }

  submit() {
    if (this.form.invalid) return;

    const req = this.isEdit
      ? this.appointmentService.updateAppointment(this.id, this.form.value)
      : this.appointmentService.createAppointment(this.form.value);

    req.subscribe(() => {
      this.router.navigate(['/appointments']);
    });
  }
}
