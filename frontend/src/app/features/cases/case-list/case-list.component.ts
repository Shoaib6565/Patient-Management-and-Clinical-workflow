import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

import { CasesService } from '../../../core/services/Cases.service';

@Component({
  selector: 'app-case-list',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterOutlet],
  templateUrl: './case-list.component.html',
  styleUrl: './case-list.component.css',
})
export class CaseListComponent {
  private readonly caseService: CasesService = inject(CasesService);
  private readonly router = inject(Router);

  public cases: any[] = [];
  public pagination: any;
  public pages: number[] = [];

  public selectedCase: any = null;
  public showDeleteModal: boolean = false;
  public caseToDelete: any = null;

  public isEditMode: boolean = false;
public editCase: any = null;

  public filters = {
    patientName: '',
    caseNumber: '',
    caseType: '',
    categoryId: '',
    caseStatus: '',
    practiceLocationId: '',
    insuranceProviderId: '',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10,
  };

  constructor() {
    this.loadCases();
  }

  loadCases() {
    this.caseService.getAllCases(this.filters).subscribe({
      next: (res: any) => {
        this.cases = res?.data || [];
        console.log(res?.data)
        this.pagination = {
          page: res?.page,
          limit: res?.limit,
          hasNextPage: res?.hasNextPage,
          hasPrevPage: res?.hasPrevPage,
        };
        this.pages = Array.from(
          { length: res?.page + (res?.hasNextPage ? 1 : 0) },
          (_, i) => i + 1
        );
      },
      error: (err) => {
        console.error('Error loading cases:', err);
        if (err.status === 401) {
          this.router.navigateByUrl('');
        }
      },
    });
  }

  applyFilters() {
    console.log("filers")
    this.filters.page = 1;
    // this.loadCases();
    console.log(this.filters)
  }

  resetFilters() {
    this.filters = {
      patientName: '',
      caseNumber: '',
      caseType: '',
      categoryId: '',
      caseStatus: '',
      practiceLocationId: '',
      insuranceProviderId: '',
      startDate: '',
      endDate: '',
      page: 1,
      limit: 10,
    };

    this.loadCases();
  }

  changePage(page: number) {
    this.filters.page = page;
    this.loadCases();
  }

  selectCase(caseItem: any) {
    this.selectedCase = caseItem;
  }

  closeDetails() {
    this.selectedCase = null;
  }

  openDeleteModal(caseItem: any) {
    this.showDeleteModal = true;
    console.log(this.caseToDelete)
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.caseToDelete = null;
  }

  confirmDelete() {
    const caseId = this.caseToDelete?.id;
    if (!caseId) return;

    this.caseService.deleteCase(caseId).subscribe({
      next: () => {
        this.loadCases();
        this.closeDeleteModal();
        if (this.selectedCase?.id === caseId) {
          this.selectedCase = null;
        }
      },
      error: (err) => {
        console.error(err);
        if (err.status === 401) {
          this.router.navigateByUrl('');
        }
      },
    });
  }

  openEdit(caseItem: any) {
  this.editCase = JSON.parse(JSON.stringify(caseItem));
  this.isEditMode = true;
}

closeEdit() {
  this.isEditMode = false;
  this.editCase = null;
}
  updateCase() {
  if (!this.editCase?.id) return;

  const payload = {
    case_number: this.editCase.case_number,
    case_type: this.editCase.case_type,
    case_status: this.editCase.case_status,
    priority: this.editCase.priority,
    purpose_of_visit: this.editCase.purpose_of_visit,
    referred_by: this.editCase.referred_by,
    referred_doctor_name: this.editCase.referred_doctor_name,
  };

  this.caseService.updateCase(this.editCase.id, payload).subscribe({
    next: () => {
      this.loadCases();
      this.closeEdit();
    },
    error: (err) => console.error('Update failed:', err),
  });
}
  exportCsv() {
    this.caseService.exportCasesCSV().subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `cases_${new Date().toISOString().split('T')[0]}.csv`;

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error(err),
    });
  }

  registerCase() {
    this.router.navigateByUrl('cases/case-form');
  }

  allowFeatures(input: string[]) {
    const role = localStorage.getItem('role');
    return role ? input.includes(role) : false;
  }
}
