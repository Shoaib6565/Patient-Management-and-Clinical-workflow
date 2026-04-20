import { Component, EventEmitter, Inject, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../core/services/category.service';
import { AuthService } from '../../../../core/services/auth-service.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
  authService = inject(AuthService);
  role = this.authService.getRole();


  @Input() isEdit = false;
  @Input() data: any;

  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form: any = {
    name: '',
    description: ''
  };

  constructor(private service: CategoryService) {}

  ngOnInit() {
    if (this.isEdit && this.data) {
      this.form = { ...this.data };
    }
  }
  canCreateAndUpdate() {
    return this.role === 'Admin';
  }
  canEditAndDelete() {
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
