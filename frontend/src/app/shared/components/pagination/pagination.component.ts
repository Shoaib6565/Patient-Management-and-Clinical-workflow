import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  // full API response pass hoga
  @Input() pagination: any;

  @Output() pageChange = new EventEmitter<number>();

  get currentPage(): number {
    return this.pagination?.current_page ?? 1;
  }

  get lastPage(): number {
    return this.pagination?.last_page ?? 1;
  }

  get pages(): number[] {
    return Array.from({ length: this.lastPage }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.lastPage) return;
    this.pageChange.emit(page);
  }

  isActive(page: number): boolean {
    return page === this.currentPage;
  }
}
