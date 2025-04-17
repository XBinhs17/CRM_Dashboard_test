import { UsersService } from './../../services/UserService.service';
import {
  Component,
  effect,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserItem } from '../../shared/types/userItem';
import { NgFor } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'user-conent',
  standalone: true,
  templateUrl: './users-content.component.html',
  styleUrls: ['./users-content.component.scss'],
  imports: [
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule,
    NgFor,
    UserCardComponent,
  ],
})
export class UsersContentComponent implements OnInit {
  selected1 = new FormControl('recently');
  selected2 = new FormControl('excel');

  users: UserItem[] = [];

  //phân trang
  pagedUsers: UserItem[] = [];
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 1;
  paginationRange: (number | string)[] = [];

  constructor(private userService: UsersService) {
    effect(() => {
      this.users = this.userService.users();
      this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
      this.updatePageUsers();
    });
  }

  ngOnInit(): void {
    this.userService.fetchUsers();
  }

  updatePageUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedUsers = this.users.slice(start, end);

    //upadte thêm hiển thị số trang
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    this.paginationRange = this.getPaginationRange();
  }

  getPaginationRange(): (number | string)[] {
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

  goToPage(page: number | string){
    if(typeof page === 'number'){
      this.currentPage = page;
      this.updatePageUsers();
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePageUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageUsers();
    }
  }
}
