import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type FilterType = 'text' | 'select' | 'dateRange';

export interface FilterField {
  key: string;
  label?: string;
  type: FilterType;
  options?: string[];
}

@Component({
  selector: 'app-data-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class DataFilterComponent {

  @Input() fields: FilterField[] = [];

  @Output() filterChange = new EventEmitter<any>();

  filterValues: any = {};

  // update filter
  onChange() {
    this.filterChange.emit(this.filterValues);
  }

  reset() {
    this.filterValues = {};
    this.filterChange.emit(this.filterValues);
  }
}
