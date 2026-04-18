import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../modal/confirmations-dialog/confirmations-dialog.component';

// export type UserRole = 'Admin' | 'Doctor' | 'FDO';

// export interface NavUser {
//   name: string;
//   role: string;
//   roleLabel: string;
//   avatar: string;
// }

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [ConfirmDialogComponent],
})
export class NavbarComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  @Output() toggleSidebar = new EventEmitter<void>();

  // Confirmation dialog state
  showConfirmDialog = false;

  // for handel profile dropdown
  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  // Replace with real user from AuthService
  userName = localStorage.getItem('userName');
  userRole = (this.authService.getRole() as string) || 'Admin';
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
    avatar: 'https://i.pravatar.cc/40?img=12',
  };

  roleLabelMap: Record<string, string> = {
    Admin: 'Administrator',
    Doctor: 'Physician',
    FDO: 'Front Desk',
  };

  get badgeClass(): string | null {
    const map: Record<string, string> = {
      Admin: 'badge-role badge-admin',
      Doctor: 'badge-role badge-doctor',
      FDO: 'badge-role badge-frontdesk',
    };
    return map[this.user.role] ?? 'badge-role';
  }

  onToggle(): void {
    this.toggleSidebar.emit();
  }

  logout(): void {
    this.showConfirmDialog = true;
  }

  confirmLogout(): void {
    this.showConfirmDialog = false;
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/signin']);
        console.log('Logout successful');
      },
    });
  }

  cancelLogout(): void {
    this.showConfirmDialog = false;
    console.log('Logout cancelled');
  }
}
