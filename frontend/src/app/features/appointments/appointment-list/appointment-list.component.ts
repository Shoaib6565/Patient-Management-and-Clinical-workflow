import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  appointments: any[] = [];
  filters: any = {};

  role: string = localStorage.getItem('role') || 'fdo';

  loading = false;

  constructor(private service: AppointmentService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.service.getAppointments(this.filters).subscribe((res: any) => {
      this.appointments = res.data || res;
      this.loading = false;
    });
  }

  onFilterChange(filters: any) {
    this.filters = filters;
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
    return this.role === 'fdo' || this.role === 'doctor';
  }

  canDelete(): boolean {
    return this.role === 'admin';
  }
}
