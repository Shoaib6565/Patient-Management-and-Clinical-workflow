import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VisitService } from '../../../core/services/visit.service';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../core/services/appointment.service';

@Component({
  selector: 'app-visit-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './visit-form.component.html',
  styleUrl: './visit-form.component.css'
})
export class VisitFormComponent implements OnInit {

  visitForm!: FormGroup;
  visitId!: number | null;
  appointmentId!: number | null;
  isEdit = false;
  loading = false;

  // simple ICD options
  icdOptions = ['A00', 'B20', 'C34', 'E11', 'I10'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private visitService: VisitService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.visitId = this.route.snapshot.params['id'];
    this.appointmentId = this.route.snapshot.params['appointmentId'];

    this.isEdit = !!this.visitId;

    this.initForm();

    if (this.isEdit) this.getVisit();
    else if (this.appointmentId) this.prefillFromAppointment();

    this.setupBMI();
  }

  initForm() {
    this.visitForm = this.fb.group({
      diagnosis: ['', Validators.required],
      diagnosis_codes: [[]], // array for checkbox

      treatment: ['', Validators.required],
      treatment_plan: [''],
      prescription: [''],

      notes: [''],
      symptoms: [''],

      visit_duration_minutes: [''],

      //  vital signs
      vital_signs: this.fb.group({
        bp: [''],
        heart_rate: [''],
        temperature: [''],
        weight: [''],
        height: [''],
        bmi: ['']
      }),

      follow_up_required: [false],
      follow_up_date: [''],

      referral_made: [false],
      referral_to: [''],

      visit_status: ['Draft', Validators.required]
    });
  }

  //   vital_signs patch
  getVisit() {
    this.loading = true;
    this.visitService.getVisitById(this.visitId!).subscribe((res: any) => {
      const data = res.data;

      this.visitForm.patchValue({
        ...data,
        vital_signs: data.vital_signs || {},
        diagnosis_codes: data.diagnosis_codes || []
      });

      this.loading = false;
    });
  }

  prefillFromAppointment() {
    this.appointmentService.getAppointmentById(this.appointmentId!)
      .subscribe(() => {
        this.visitForm.patchValue({
          notes: 'Auto-generated from appointment'
        });
      });
  }

  //  ICD checkbox handler
  onICDChange(code: string, event: any) {
    const current = this.visitForm.value.diagnosis_codes || [];

    if (event.target.checked) {
      this.visitForm.patchValue({
        diagnosis_codes: [...current, code]
      });
    } else {
      this.visitForm.patchValue({
        diagnosis_codes: current.filter((c: string) => c !== code)
      });
    }
  }

  //  BMI auto calc
  setupBMI() {
    this.visitForm.get('vital_signs')?.valueChanges.subscribe((val: any) => {
      const h = val.height / 100;
      const w = val.weight;

      if (h && w) {
        const bmi = w / (h * h);
        this.visitForm.get('vital_signs.bmi')?.setValue(bmi.toFixed(2), { emitEvent: false });
      }
    });
  }

  submit() {
    if (this.visitForm.invalid) {
      this.visitForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.visitService.updateVisit(this.visitId!, this.visitForm.value)
      .subscribe(() => {
        this.router.navigate(['/visits']);
      });
  }

  cancel() {
    this.router.navigate(['/visits']);
  }
}
