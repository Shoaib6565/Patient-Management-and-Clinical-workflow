import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { PatientManagementService } from '../../../core/services/PatientManagement.service';
import {PatientStateService} from '../../../core/services/PatientState.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent {
  private readonly patientService: PatientManagementService = inject(PatientManagementService);
  private readonly patientState = inject(PatientStateService);

  private readonly router = inject(Router);
  public patients: any[] = [];
  public pagination: any;
  public pages: number[] = [];

  public selectedPatient: any = null;
  public showDeleteModal: boolean = false;
  public patientToDelete: any = null;

  public isEditMode: boolean = false;
public editPatient: any = null;

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
         if(err.status===401)
        {
          this.router.navigateByUrl('');
        }
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
      this.patientState.setPatientId(patient.id);

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
        if(err.status===401)
        {
          this.router.navigateByUrl('');
        }
      },
    });
  }

  openEdit(patient: any) {
  this.editPatient = JSON.parse(JSON.stringify(patient)); // deep copy
  this.isEditMode = true;
}

closeEdit() {
  this.isEditMode = false;
  this.editPatient = null;
}


  updatePatient() {
  if (!this.editPatient?.id) return;

  const payload = {
    first_name: this.editPatient.first_name,
    last_name: this.editPatient.last_name,
    middle_name: this.editPatient.middle_name,

    phone: this.editPatient.phone,
    mobile: this.editPatient.mobile,
    email: this.editPatient.email,

    gender: this.editPatient.gender,
    date_of_birth: this.editPatient.date_of_birth,

    city: this.editPatient.city,
    state: this.editPatient.state,
    country: this.editPatient.country,
    zip_code: this.editPatient.zip_code,
    address: this.editPatient.address,

    preferred_language: this.editPatient.preferred_language,
    patient_status: this.editPatient.patient_status,

    primary_physician: this.editPatient.primary_physician,
    insurance_provider: this.editPatient.insurance_provider,
    insurance_policy_number: this.editPatient.insurance_policy_number,

    emergency_contact_name: this.editPatient.emergency_contact_name,
    emergency_contact_phone: this.editPatient.emergency_contact_phone,
  };

  this.patientService.updatePatient(this.editPatient.id, payload).subscribe({
    next: () => {
      this.loadPatients();
      this.closeEdit();
      this.closeDetails();
    },
    error: (err) => console.error('Update failed:', err),
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

  allowFeatures(input:string[])
  {
    const currentRole= localStorage.getItem("role");
    if(currentRole===null)
    {
      return false;
    }
    return input.includes(currentRole);
  }
  registerCase() {
    this.router.navigateByUrl('cases/case-form');
  }
}
