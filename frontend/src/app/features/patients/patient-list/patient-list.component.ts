import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { PatientManagementService } from '../../../core/services/PatientManagement.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent {
  private readonly patientService = inject(PatientManagementService);
  private readonly router = inject(Router);
  public patients: any[] = [];
  public pagination: any;
  public pages: number[] = [];

  public selectedPatient: any = null;
  public showDeleteModal: boolean = false;
  public patientToDelete: any = null;

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
          (_, i) => i + 1,
        );
      },
      error: (err) => {
        console.error('Error loading patients:', err);
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

  openDeleteModal(patient: any) {
    this.patientToDelete = patient;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.patientToDelete = null;
  }

  confirmDelete() {
    const patientId = this.patientToDelete?.id;
    if (!patientId) return;

    this.patientService.deletePatient(patientId).subscribe({
      next: (res: any) => {
        console.log('Patient deleted successfully:', res);
        this.loadPatients();
        this.closeDeleteModal();
        if (this.selectedPatient?.id === patientId) {
          this.selectedPatient = null;
        }
      },
      error: (err) => {
        console.error('Delete failed:', err);
      },
    });
  }
  updatePatient(patient: any) {
    if (!patient?.id) return;

    const payload = {
      first_name: patient.first_name,
      last_name: patient.last_name,
      phone: patient.phone,
      mobile: patient.mobile,
      email: patient.email,
      gender: patient.gender,
      city: patient.city,
      state: patient.state,
      address: patient.address,
      patient_status: patient.patient_status,
      primary_physician: patient.primary_physician,
      insurance_provider: patient.insurance_provider,
      insurance_policy_number: patient.insurance_policy_number,
    };

    this.patientService.updatePatient(patient.id, payload).subscribe({
      next: () => {
        this.loadPatients();
        this.closeDetails();
      },
      error: (err) => {
        debugger;
        console.error('Update failed:', err);
      },
    });
  }

  exportCsv() {
    this.patientService.exportPatientsCSV().subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;

        const fileName = `patients_${new Date().toISOString().split('T')[0]}.csv`;
        a.download = fileName;

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },

      error: (err) => {
        console.error('CSV export failed', err);
      },
    });
  }
  registerPatient() {
    this.router.navigateByUrl('patients/patient-form');
  }
}
