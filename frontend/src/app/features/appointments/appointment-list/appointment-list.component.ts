import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { AppointmentService } from '../../../core/services/appointment.service';
import { AppointmentFilterComponent } from '../../../shared/components/appointment-filters/appointment-filters.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterModule,
    NgxDatatableModule,
    AppointmentFilterComponent,
    PaginationComponent,
  ],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
// RouterModule is already imported, so router-outlet will work
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];
  filters: any = {};
  paginationData: any;
  currentPage = 1;
  role: string | undefined = localStorage.getItem('role') || undefined;
  loading = false;
  isFormOpen = false;
  Math = Math; // expose Math to template

  constructor(public service: AppointmentService) {}
  location = inject(Location);
  router = inject(Router)

  ngOnInit() {
    this.loadData();
    // Detect when form opens/closes by listening to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isFormOpen = event.url.includes('/appointments/create') || event.url.includes('/appointments/edit');
    });
  }

  goBack(){
    this.location.back();
  }

  // load data when page change
  loadData(page: number = 1) {
    this.loading = true;

    const params = {
      patient_name: this.filters.patientName,
      doctor_name: this.filters.doctorName,
      specialty_name: this.filters.specialty,
      start_date: this.filters.startDate,
      end_date: this.filters.endDate,
      appointment_type: this.filters.appointmentType,
      status: this.filters.status,
      practice_location: this.filters.practiceLocation,
      created_by: this.filters.createdBy,
      page: page,
    };

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
    // Navigate to the appointment form page
    // You can use Angular's Router for navigation
    // For example:
    // this.router.navigate(['/appointment-form']);
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
    this.service
      .deleteAppointment(id)
      .subscribe(() => this.loadData(this.currentPage));
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

  canEdit(): boolean {
    return this.role === 'FDO' || this.role === 'Doctor';
  }

  canDelete(): boolean {
    return this.role === 'Admin';
  }
}
