import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppointmentService } from '../../../core/services/appointment.service';
import { AppointmentFilterComponent } from '../../../shared/components/appointment-filters/appointment-filters.component';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxDatatableModule, AppointmentFilterComponent],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  appointments: any[] = [];
  filters: any = {};

  role: string | undefined = localStorage.getItem('role') || undefined;

  loading = false;

  constructor(public service: AppointmentService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.service.getAppointments(this.filters).subscribe({
      next: (res: any) => {
        console.log('API Response:', res);
        console.log('Appointments data:', res.data);
        this.appointments = res.data || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        this.appointments = [];
        this.loading = false;
      }
    });
  }

  onApplyFilter(filters: any) {
    this.filters = filters;
    this.loadData();
  }

  onResetFilter() {
    this.filters = {};
    this.loadData();
  }

  delete(id: number) {
    this.service.deleteAppointment(id).subscribe(() => this.loadData());
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
