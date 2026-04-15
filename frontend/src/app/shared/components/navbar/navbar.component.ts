import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service.service'; 
import { Router } from '@angular/router';

// export type UserRole = 'admin' | 'doctor' | 'frontdesk';

// export interface NavUser {
//   name: string;
//   role: string;
//   roleLabel: string;
//   avatar: string;
// }

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  router = inject(Router);
  authService = inject(AuthService);

  @Output() toggleSidebar = new EventEmitter<void>();


  // for handel profile dropdown
  isDropdownOpen = false;

toggleDropdown(): void {
  this.isDropdownOpen = !this.isDropdownOpen;
}
closeDropdown(): void {
  this.isDropdownOpen = false;
}


//  for random create user profile pic
// get initials(): string {
//   return this.user.name
//     .split(' ')
//     .slice(0, 2)
//     .map(word => word[0].toUpperCase())
//     .join('');
// }




  // Replace with real user from AuthService
  // e.g. this.authService.currentUser$
  userName = localStorage.getItem('name');
  userRole  = localStorage.getItem('role');

   getRoleLabel(): string | undefined {
    if (this.userRole === 'Admin') return 'Administrator';
    if (this.userRole === 'Doctor') return 'Physician';
    if (this.userRole === 'FDO') return 'Front Desk';
    return undefined;
  }

  user = {
    name: this.userName || 'shoaib',
    role: this.userRole || 'Admin',
    roleLabel: this.getRoleLabel() || 'Administrator',
    avatar: 'https://i.pravatar.cc/40?img=3'
  };

  roleLabelMap: Record<string, string> = {
    Admin: 'Administrator',
    Doctor: 'Physician',
    FDO: 'Front Desk'
  };

  get badgeClass(): string | null {
    const map: Record<string, string> = {
      Admin:     'badge-role badge-admin',
      Doctor:    'badge-role badge-doctor',
      FDO: 'badge-role badge-frontdesk'
    };
    return map[this.user.role] ?? 'badge-role';
  }

  onToggle(): void {
    this.toggleSidebar.emit();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
    console.log('Logout clicked');
  }
}