import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  NgModule,
  Output,
} from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { SpecialtyService } from '../../../core/services/specialty.service';

@Component({
  selector: 'app-appointment-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment-filters.component.html',
  styleUrl: './appointment-filters.component.css',
})
export class AppointmentFilterComponent {
  specialtiesService = inject(SpecialtyService);

  @Output() applyFilter = new EventEmitter<any>();
  @Output() resetFilter = new EventEmitter<void>();

  // for appointmetn select status
  appointmentStatuses = [
    'Scheduled',
    'Confirmed',
    'Checked In',
    'In Progress',
    'Completed',
    'Cancelled',
    'No Show',
    'Rescheduled',
  ];

  // for selecting appointment type
  appointmentTypes = [
    'New Patient',
    'Follow-up',
    'Consultation',
    'Procedure',
    'Telehealth',
    'Emergency',
    'Routine Checkup',
    'Post-op Follow-up',
  ];
  isExpanded = false;

  specialties: any[] = [];
  ngOnInit() {
    this.loadSpecialties();
  }

  loadSpecialties() {
    this.specialtiesService.getSpecialties().subscribe({
      next: (res) => {
        this.specialties = res.data;
        console.log(this.specialties)
      },
      error: (error) => {
        console.error('Error loading specialties:', error);
        this.specialties = [];
      },
    });
  }

  filters: any = {
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

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  apply() {
    const cleanFilters = Object.fromEntries(
      Object.entries(this.filters).filter(([_, v]) => v !== '' && v !== null),
    );

    this.applyFilter.emit(cleanFilters);
  }

  reset() {
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

    this.resetFilter.emit();
  }
}
