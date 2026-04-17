import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { PatientManagementService } from '../../../core/services/PatientManagement.service';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css',
})
export class PatientFormComponent {
  private readonly patientService = inject(PatientManagementService);

  public loading = false;
  public successMessage = '';
  public errorMessage = '';
  public isOpen = true;

  public patientForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    middle_name: new FormControl(''),
    last_name: new FormControl('', [Validators.required]),

    date_of_birth: new FormControl('', [Validators.required]),
    age: new FormControl({ value: '', disabled: true }),

    gender: new FormControl('', [Validators.required]),

    ssn: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),

    phone: new FormControl(''),
    mobile: new FormControl(''),

    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip_code: new FormControl(''),
    country: new FormControl(''),

    emergency_contact_name: new FormControl(''),
    emergency_contact_phone: new FormControl(''),

    primary_physician: new FormControl(''),

    insurance_provider: new FormControl(''),
    insurance_policy_number: new FormControl(''),

    preferred_language: new FormControl('English'),

    patient_status: new FormControl('Active'),

    registration_date: new FormControl(new Date().toISOString()),
  });

  constructor() {
    this.patientForm
      .get('date_of_birth')
      ?.valueChanges.subscribe((dob: any) => {
        if (!dob) return;

        const age = this.calculateAge(dob);
        this.patientForm.get('age')?.setValue(age, { emitEvent: false });
      });
      this.createPatient
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  createPatient() {
    if (this.patientForm.invalid) return;

    const formValue = this.patientForm.getRawValue();

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.patientService
      .checkDuplicatePatient(
        formValue.first_name!,
        formValue.last_name!,
        formValue.date_of_birth!,
      )
      .subscribe({
        next: (res: any) => {
          if (res.exists) {
            this.errorMessage = 'Patient already exists with same details';
            this.loading = false;
            return;
          }
          this.patientService.createPatient(formValue).subscribe({
            next: (createRes: any) => {
              this.successMessage = createRes.message;

              this.patientForm.reset({
                preferred_language: 'English',
                patient_status: 'Active',
                registration_date: new Date().toISOString(),
              });

              this.loading = false;
            },
            error: (err) => {
              this.errorMessage =
                err?.error?.message || 'Failed to create patient';
              this.loading = false;
            },
          });
        },
        error: () => {
          this.errorMessage = 'Duplicate check failed';
          this.loading = false;
        },
      });
  }



  closeDetails() {
    this.isOpen = false;
    this.patientForm.reset({
      preferred_language: 'English',
      patient_status: 'Active',
      registration_date: new Date().toISOString(),
    });

    this.successMessage = '';
    this.errorMessage = '';
  }
}
