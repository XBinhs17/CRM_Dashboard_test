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
import { PaginationComponent } from '../../components/pagination/pagination.component';

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
    PaginationComponent,
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

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePageUsers();
  }

  updatePageUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedUsers = this.users.slice(start, end);
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
  }
}
