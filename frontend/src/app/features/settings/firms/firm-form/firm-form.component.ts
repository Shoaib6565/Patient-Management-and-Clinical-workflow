import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-service.service';
import { FirmService } from '../../../../core/services/firm.service';

@Component({
  selector: 'app-firm-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './firm-form.component.html'
})
export class FirmFormComponent implements OnInit {
  authService = inject(AuthService);
  role = this.authService.getRole();

  @Input() isEdit = false;
  @Input() data: any;

  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form: any = {
    firm_name: '',
    firm_type: 'Legal',
    address: '',
    phone: '',
    contact_person: ''
  };

  firmTypes = ['Legal', 'Corporate', 'Government', 'Other'];

  constructor(private service: FirmService) {}

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
