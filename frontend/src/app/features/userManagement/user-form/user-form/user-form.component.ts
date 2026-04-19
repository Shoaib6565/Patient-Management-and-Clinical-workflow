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
import { UserManagementService } from '../../../../core/services/userManagement.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  private readonly userService = inject(UserManagementService);
  private readonly router = inject(Router);

  public loading = false;
  public successMessage = '';
  public errorMessage = '';
  public isOpen = true;

  public userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),

    role_id: new FormControl('', [Validators.required]),
    is_active: new FormControl(true),
  });

  createUser() {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.getRawValue();

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.userService.createUser(formValue).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;

        this.userForm.reset({
          is_active: true,
        });

        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to create user';
        this.loading = false;
      },
    });
  }

  closeForm() {
    this.isOpen = false;

    this.userForm.reset({
      is_active: true,
    });

    this.successMessage = '';
    this.errorMessage = '';
  }
}
