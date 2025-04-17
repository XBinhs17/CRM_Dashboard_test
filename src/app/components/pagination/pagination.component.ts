import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  imports: [NgFor],
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() pageChange = new EventEmitter<number>();

  get paginationRange(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2;
    const range: (number | string)[] = [];

    if (total <= 4) {
      for (let i = 1; i <= total; i++) {
        range.push(i);
      }
    } else {
      range.push(1);
      if (current > delta + 2) {
        range.push('...');
      }

      const start = Math.max(2, current - delta);
      const end = Math.min(total - 1, current + delta);
      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      if (current < total - delta - 1) {
        range.push('...');
      }
      range.push(total);
    }
    return range;
  }

  goToPage(page: number | string) {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
