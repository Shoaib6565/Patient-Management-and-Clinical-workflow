import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html'
})
export class FilterComponent {

  search = '';
  status = 'all';

  @Output() apply = new EventEmitter<any>();
  @Output() reset = new EventEmitter<void>();

  onApply() {
    this.apply.emit({
      search: this.search,
      status: this.status
    });
  }

  onReset() {
    this.search = '';
    this.status = 'all';
    this.reset.emit();
  }
}
