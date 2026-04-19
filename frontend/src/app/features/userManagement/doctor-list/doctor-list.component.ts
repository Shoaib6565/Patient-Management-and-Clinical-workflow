import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserManagementService } from '../../../core/services/userManagement.service';
@Component({
  selector: 'app-doctor-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent {
  private readonly userService = inject(UserManagementService);
  private readonly router = inject(Router);

  public users: any[] = [];
  public selectedUser: any = null;

  public isEditMode: boolean = false;
  public editUser: any = null;

  public showDeleteModal: boolean = false;
  public userToDelete: any = null;

  public doctors: any=[];

  public showResetModal: boolean = false;
public resetUser: any = null;
public newPassword: string = '';

  constructor() { }

  ngOnInit() {
  this.loadUsers();
}

 loadUsers() {
   this.userService.getAllUsers().subscribe((res: any) => {
    if (res.success) {
      this.users = res.data;

      this.users.forEach(user => {
        console.log(user.roles?.[0]?.name==='Doctor');
      });
      console.log(this.users)
    }
  });


}


  selectUser(user: any) {
    this.selectedUser = user;
  }

  closeDetails() {
    this.selectedUser = null;
  }

  openDeleteModal(user: any) {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  get filteredUsers() {
    return this.users.filter(user =>
      user.roles?.some((role: any) => role.name === 'Doctor')
    );
  }


 confirmDelete() {
  const userId = this.userToDelete?.id;
  if (!userId) return;

  this.userService.deleteUser(userId).subscribe({
    next: () => {
      this.users = this.users.filter(u => u.id !== userId); // faster UI update
      this.closeDeleteModal();
    },
    error: (err) => console.error('Delete failed:', err),
  });
}

    openEdit(user: any) {
    this.editUser = structuredClone(user);
    this.editUser.isActive = user.isActive ?? true;
    this.isEditMode = true;
  }


  closeEdit() {
    this.isEditMode = false;
    this.editUser = null;
  }

updateUser() {
  if (!this.editUser?.id) return;

  const payload = {
    name: this.editUser.name,
    email: this.editUser.email,
    is_active: this.editUser.is_active,
  };
  console.log(payload)
  this.userService.updateUser(this.editUser.id, payload).subscribe({
    next: () => {
      this.loadUsers();
      this.closeEdit();
      this.closeDetails();
    },
    error: (err) => {
      console.error('Update failed:', err);
    }
  });
}

 openResetModal(user: any) {
  this.resetUser = user;
  this.newPassword = '';
  this.showResetModal = true;
}

closeResetModal() {
  this.showResetModal = false;
  this.resetUser = null;
  this.newPassword = '';
}

confirmResetPassword() {
  if (!this.resetUser?.id || !this.newPassword?.trim()) return;

  this.userService.resetPassword(this.resetUser.id, this.newPassword).subscribe({
    next: () => {
      alert('Password reset successful');
      this.closeResetModal();
    },
    error: (err) => console.error('Reset failed:', err),
  });
}


  createUser() {
    this.router.navigateByUrl('users/user-form');
  }
}
