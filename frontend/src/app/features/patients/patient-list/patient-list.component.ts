import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientManagementService } from '../../../core/services/PatientManagement.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent {
  private readonly patientService = inject(PatientManagementService);

  public patients: any[] = [];
  public pagination: any;
  public pages: number[] = [];

  public selectedPatient: any = null;

  public filters = {
    name: '',
    gender: '',
    city: '',
    state: '',
    ssn: '',
    dob_from: '',
    dob_to: '',
    reg_from: '',
    reg_to: '',
    page: 1,
    limit: 10,
  };

  constructor() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getAllPatients(this.filters).subscribe({
      next: (res: any) => {
        this.patients = res?.data?.patients || [];
        this.pagination = res?.data?.pagination || {};

        this.pages = Array.from(
          { length: this.pagination?.totalPages || 0 },
          (_, i) => i + 1
        );
      },
    });
  }

  applyFilters() {
    this.filters.page = 1;
    this.loadPatients();
  }

  resetFilters() {
    this.filters = {
      name: '',
      gender: '',
      city: '',
      state: '',
      ssn: '',
      dob_from: '',
      dob_to: '',
      reg_from: '',
      reg_to: '',
      page: 1,
      limit: 10,
    };
    this.loadPatients();
  }

  changePage(page: number) {
    this.filters.page = page;
    this.loadPatients();
  }

  selectPatient(patient: any) {
    this.selectedPatient = patient;
  }

  closeDetails() {
    this.selectedPatient = null;
  }
}
