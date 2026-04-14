import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html'
})
export class AppointmentFormComponent implements OnInit {

  form!: FormGroup;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private service: AppointmentService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      patient_id: ['', Validators.required],
      doctor_id: ['', Validators.required],
      appointment_date: ['', Validators.required],
      appointment_time: ['', Validators.required],
      appointment_type: ['', Validators.required],
      reason_for_visit: ['', Validators.required],
    });
  }

  submit() {
    if (this.editMode) {
      // update API
    } else {
      this.service.create(this.form.value).subscribe();
    }
  }
}
