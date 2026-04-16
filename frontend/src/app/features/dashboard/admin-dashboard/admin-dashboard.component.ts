import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientManagementService } from '../../../core/services/PatientManagement.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  // console.log('AdminDashboardComponent initialized');

  stats = {
    totalPatients: 12842,
    activeCases: 1402,
    appointments: 48,
    doctors: 24
  };

  showVisitTypes = true;

  visitTypes = [
    { label: 'General Consultation', value: 45 },
    { label: 'Specialist Follow-up', value: 32 },
    { label: 'Emergency Care', value: 15 },
    { label: 'Diagnostic Testing', value: 8 }
  ];
}
