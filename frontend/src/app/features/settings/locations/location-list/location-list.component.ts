import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-service.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalComponent } from '../../../../shared/components/modal/form-modal/form-modal.component';
import { ConfirmDialogComponent } from '../../../../shared/components/modal/confirmations-dialog/confirmations-dialog.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { FilterComponent } from '../../../../shared/components/filter/filter.component';
import { PracticeLocationService } from '../../../../core/services/practice-location.service';
import { LocationFormComponent } from '../location-form/location-form.component';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    FilterComponent,
    PaginationComponent,
    ModalComponent,
    ConfirmDialogComponent,
    LocationFormComponent
  ],
  templateUrl: './location-list.component.html'
})
export class LocationListComponent implements OnInit {

  authService = inject(AuthService);
  role = this.authService.getRole();

  rows: any[] = [];
  loading = false;
  pagination: any = {};
  currentPage = 1;

  showForm = false;
  isEdit = false;
  selectedData: any = null;

  showConfirmDialog = false;
  deleteId: number | null = null;
  deleteItemName: string = '';

  filter = { search: '', status: 'all' };

  constructor(private service: PracticeLocationService) {}

  ngOnInit() {
    this.load();
  }

  load(page: number = 1) {
    this.loading = true;
    this.currentPage = page;

    this.service.getAll({
      search: this.filter.search,
      filter: this.filter.status,
      page: page
    }).subscribe((res: any) => {
      this.rows = res.data;
      this.pagination = res;
      this.loading = false;
    });
  }

  canCreateEditAndDelete() {
    return this.role === 'Admin';
  }

  applyFilter(e: any) {
    this.filter = e;
    this.load();
  }

  resetFilter() {
    this.filter = { search: '', status: 'all' };
    this.load();
  }

  openCreate() {
    this.isEdit = false;
    this.selectedData = null;
    this.showForm = true;
  }

  openEdit(row: any) {
    this.isEdit = true;
    this.selectedData = row;
    this.showForm = true;
  }

  onSaved() {
    this.showForm = false;
    this.load();
  }

  delete(id: number) {
    this.deleteId = id;
    this.showConfirmDialog = true;
  }

  onConfirmDelete() {
    if (this.deleteId !== null) {
      this.service.delete(this.deleteId).subscribe(() => {
        this.showConfirmDialog = false;
        this.deleteId = null;
        this.load();
      });
    }
  }

  onCancelDelete() {
    this.showConfirmDialog = false;
    this.deleteId = null;
  }

  toggle(row: any) {
    const req = row.is_active
      ? this.service.deactivate(row.id)
      : this.service.activate(row.id);

    req.subscribe(() => this.load());
  }
}
