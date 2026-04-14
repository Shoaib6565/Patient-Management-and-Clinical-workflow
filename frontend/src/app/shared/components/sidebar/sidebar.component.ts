import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

export type UserRole = 'Admin' | 'Doctor' | 'FDO';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() isOpen: boolean = true;

  // Replace with real role from AuthService
  // e.g. this.authService.currentUser.role
  role: UserRole = localStorage.getItem('role') as UserRole || 'Admin';

  isSettingsOpen = false;

  get isAdmin(): boolean {
    return this.role === 'Admin';
  }

  get dashboardRoute(): string {
    const routes: Record<UserRole, string> = {
      Admin:  '/dashboard/admin',
      Doctor: '/dashboard/doctor',
      FDO:    '/dashboard/frontdesk'
    };
    return routes[this.role];
  }

  get appointmentsRoute(): string {
    const routes: Record<UserRole, string> = {
      Admin:  '/appointments',
      Doctor: '/appointments',
      FDO:    '/appointments'
    };
    return routes[this.role];
  }

  toggleSettings(): void {
    this.isSettingsOpen = !this.isSettingsOpen;
  }
}