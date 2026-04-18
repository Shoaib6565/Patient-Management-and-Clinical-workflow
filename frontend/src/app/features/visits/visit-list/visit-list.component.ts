import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VisitService } from '../../../core/services/visit.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../../../shared/components/modal/confirmations-dialog/confirmations-dialog.component';

@Component({
  selector: 'app-visit-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxDatatableModule,
    PaginationComponent,
    ConfirmDialogComponent
  ],
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {

  visits: any[] = [];
  paginationData: any;
  loading = false;
  currentPage = 1;

  filters: any = {
    patient_name: '',
    doctor: '',
   case_type: '',
    diagnosis: '',
    visit_status: ''
  };

  role: string | null = localStorage.getItem('role');

  location = inject(Location);
  Math = Math; // expose Math to template

  // Confirmation dialog properties
  confirmDialog = {
    visible: false,
    title: '',
    message: '',
    buttonName: '',
    action: ''
  };
  selectedId: number | null = null;

  constructor(public service: VisitService) {}

  ngOnInit(): void {
    this.loadData();
  }

  goBack() {
    this.location.back();
  }

  loadData(page: number = 1) {

    this.loading = true;

    const params = {
      ...this.filters,
      page
    };

    this.service.getVisits(params).subscribe({
      next: (res: any) => {
        this.visits = res.data || [];
        console.log(res);
        this.paginationData = res;
        this.currentPage = res.current_page;
        this.loading = false;
      },
      error: () => {
        this.visits = [];
        this.loading = false;
      }
    });
  }

  onPageChange(page: number) {
    this.loadData(page);
  }

  applyFilter(filters: any) {
    this.filters = filters;
    this.loadData(1);
  }

  resetFilter() {
    this.filters = {
      patient: '',
      doctor: '',
      case_type: '',
      diagnosis: '',
      start_date: '',
      end_date: '',
      visit_status: ''
    };

    this.loadData(1);
  }

  canEdit(row: any): boolean {
    return this.role === 'Doctor' && row.visit_status !== 'Completed';
  }

  canDelete(): boolean {
    return this.role === 'Admin';
  }

  canFinalize(row: any): boolean {
    return this.role === 'Doctor' && row.visit_status !== 'Completed';
  }

  delete(id: number) {
    this.selectedId = id;
    this.confirmDialog = {
      visible: true,
      title: 'Delete Visit',
      message: 'Are you sure you want to delete this visit? This action cannot be undone.',
      buttonName: 'Delete',
      action: 'delete'
    };
  }

  finalize(id: number) {
    this.selectedId = id;
    this.confirmDialog = {
      visible: true,
      title: 'Finalize Visit',
      message: 'Are you sure you want to finalize this visit? Once finalized, it cannot be edited.',
      buttonName: 'Finalize',
      action: 'finalize'
    };
  }

  onConfirmDialog() {
    if (!this.selectedId) return;

    if (this.confirmDialog.action === 'delete') {
      this.service.deleteVisit(this.selectedId).subscribe(() => {
        this.loadData(this.currentPage);
        this.closeDialog();
      });
    } else if (this.confirmDialog.action === 'finalize') {
      this.service.completeVisit(this.selectedId).subscribe(() => {
        this.loadData(this.currentPage);
        this.closeDialog();
      });
    }
  }

  onCancelDialog() {
    this.closeDialog();
  }

  closeDialog() {
    this.confirmDialog.visible = false;
    this.selectedId = null;
  }
}
