import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CasesService } from '../../../core/services/Cases.service';
import { PatientStateService } from '../../../core/services/PatientState.service';

@Component({
  selector: 'app-case-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './case-form.component.html',
  styleUrl: './case-form.component.css',
})
export class CaseFormComponent implements OnInit {
  private readonly caseService = inject(CasesService);
  private readonly patientState = inject(PatientStateService);
  private readonly router = inject(Router);

  public loading = false;
  public successMessage = '';
  public errorMessage = '';

  public isOpen = true;

  public caseForm: FormGroup = new FormGroup({
    patient_id: new FormControl('', [Validators.required]),
    practice_location_id: new FormControl('', [Validators.required]),

    category_id: new FormControl(''),
    insurance_id: new FormControl(''),
    firm_id: new FormControl(''),

    case_type: new FormControl(null),
    case_status: new FormControl(null),
    priority: new FormControl(null),

    purpose_of_visit: new FormControl(''),
    date_of_accident: new FormControl(''),
    opening_date: new FormControl(''),

    referred_by: new FormControl(''),
    referred_doctor_name: new FormControl(''),

    clinical_notes: new FormControl(''),
  });

  ngOnInit(): void {
    this.patientState.selectedPatientId$.subscribe((id) => {
      if (id) {
        this.caseForm.patchValue({
          patient_id: id,
        });
      }
    });
  }

  createCase() {
    if (this.caseForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = this.caseForm.getRawValue();

    console.log('PAYLOAD SENT:', payload);

    this.caseService.createCase(payload).subscribe({
      next: (res: any) => {
        this.successMessage = res?.message || 'Case created successfully';
        const patientId = this.caseForm.value.patient_id;

        this.caseForm.reset({
          patient_id: patientId || null,
        });

        this.loading = false;
      },

      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to create case';

        this.loading = false;
      },
    });
  }

  closeDetails() {
    this.isOpen = false;
    this.caseForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
    this.router.navigate(['/cases']);
  }
}
