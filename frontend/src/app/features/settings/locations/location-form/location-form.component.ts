import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-service.service';
import { PracticeLocationService } from '../../../../core/services/practice-location.service';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location-form.component.html'
})
export class LocationFormComponent implements OnInit {
  authService = inject(AuthService);
  role = this.authService.getRole();

  @Input() isEdit = false;
  @Input() data: any;

  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form: any = {
    location_name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: ''
  };

  constructor(private service: PracticeLocationService) {}

  ngOnInit() {
    if (this.isEdit && this.data) {
      this.form = { ...this.data };
    }
  }

  canCreateAndUpdate() {
    return this.role === 'Admin';
  }

  save() {
    const req = this.isEdit
      ? this.service.update(this.form.id, this.form)
      : this.service.create(this.form);

    req.subscribe(() => {
      this.saved.emit();
    });
  }

  back() {
    this.cancel.emit();
  }
}
