import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { AppointmentService } from '../../../core/services/appointment.service';
import { AppointmentFilterComponent } from '../../../shared/components/appointment-filters/appointment-filters.component';
import { ConfirmDialogComponent } from '../../../shared/components/modal/confirmations-dialog/confirmations-dialog.component';
import { filter } from 'rxjs';
import { AuthService } from '../../../core/services/auth-service.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxDatatableModule,
    AppointmentFilterComponent,
    PaginationComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
// RouterModule is already imported, so router-outlet will work
export class AppointmentListComponent implements OnInit {
  authService = inject(AuthService);
  appointments: any[] = [];
  filters: any = {};
  paginationData: any;
  currentPage = 1;
  role: string | undefined = this.authService.getRole() || undefined;
  loading = false;
  isFormOpen = false;
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

  constructor(public service: AppointmentService) {}
  location = inject(Location);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.loadData();

    // Check current route on init to catch initial navigation
    this.checkIfFormOpen();

    // Detect when form opens/closes by listening to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isFormOpen = event.url.includes('/appointments/create') || event.url.includes('/appointments/edit');
    });
  }

  checkIfFormOpen() {
    const url = this.router.url;
    this.isFormOpen = url.includes('/appointments/create') || url.includes('/appointments/edit');
  }

  goBack(){
    this.location.back();
  }

  // load data when page change
  loadData(page: number = 1) {
    this.loading = true;

    const params: any = {
      page: page,
    };

    // only add filter parameters if they have values (not undefined, null, or empty string)
    if (this.filters.patientName) params.patient_name = this.filters.patientName;
    if (this.filters.doctorName) params.doctor_name = this.filters.doctorName;
    if (this.filters.specialty) params.specialty_name = this.filters.specialty;
    if (this.filters.startDate) params.start_date = this.filters.startDate;
    if (this.filters.endDate) params.end_date = this.filters.endDate;
    if (this.filters.appointmentType) params.appointment_type = this.filters.appointmentType;
    if (this.filters.status) params.status = this.filters.status;
    if (this.filters.practiceLocation) params.practice_location = this.filters.practiceLocation;
    if (this.filters.createdBy) params.created_by = this.filters.createdBy;

    this.service.getAppointments(params).subscribe({
      next: (res: any) => {
        console.log('API Response:', res);

        this.appointments = res.data || [];
        this.paginationData = res;
        this.currentPage = res.current_page;

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        this.appointments = [];
        this.loading = false;
      },
    });
  }


  createAppointment() {
      this.router.navigate(['/appointments/create']);
  }
  //  Pagination event
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData(page);
  }

  // Filters
  onApplyFilter(filters: any) {
    this.filters = filters;
    this.loadData(1); // reset to page 1
  }

  onResetFilter() {
    this.filters = {
      patientName: '',
      doctorName: '',
      specialty: '',
      startDate: '',
      endDate: '',
      appointmentType: '',
      status: '',
      practiceLocation: '',
      createdBy: '',
    };

    this.loadData(1);
  }

  delete(id: number) {
    this.selectedId = id;
    this.confirmDialog = {
      visible: true,
      title: 'Delete Appointment',
      message: 'Are you sure you want to delete this appointment? This action cannot be undone.',
      buttonName: 'Delete',
      action: 'delete'
    };
  }

  completeAppointment(id: number) {
    this.selectedId = id;
    this.confirmDialog = {
      visible: true,
      title: 'Complete Appointment',
      message: 'Mark this appointment as completed?',
      buttonName: 'Complete',
      action: 'complete'
    };
  }

  onConfirmDialog() {
    if (!this.selectedId) return;

    if (this.confirmDialog.action === 'delete') {
      this.service
        .deleteAppointment(this.selectedId)
        .subscribe(() => {
          this.loadData(this.currentPage);
          this.closeDialog();
        });
    } else if (this.confirmDialog.action === 'complete') {
      this.service
        .updateStatus(this.selectedId, { status: 'Completed' })
        .subscribe(() => {
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

  exportCSV() {
    this.service.exportCsv(this.filters).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'appointments.csv';
      a.click();
    });
  }

  canCreate(): boolean {
    return this.role === 'FDO' || this.role === 'Admin';
  }
  canEdit(): boolean {
    return this.role === 'FDO' || this.role === 'Admin';
  }
  canComplete(): boolean {
    return  this.role === 'Doctor';
  }

  canDelete(): boolean {
    return this.role === 'Admin';
  }
}
