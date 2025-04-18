import { TargetsService } from './../../services/TargetsService.service';
import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TargetItem } from '../../shared/types/targetItem';
import { NgClass, NgFor, NgForOf } from '@angular/common';
import { TargetCardComponent } from './target-card/target-card.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'targets-content',
  templateUrl: './targets-content.component.html',
  styleUrls: ['./target-content.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CdkDropListGroup,
    CdkDropList,
    NgFor,
    NgForOf,
    MatIconModule,
    TargetCardComponent,
    MatTableModule,
    NgClass,
  ],
})
export class TargetContentComponen implements OnInit {
  selected = new FormControl('recently');

  //state theo dõi đang dùng view nào
  viewMode = signal<'grid' | 'table'>('grid');
  public targets = signal<TargetItem[]>([]);
  displayedColumns: string[] = ['name', 'status', 'updated'];

  connectedDropLists: string[] = [];

  readonly statusList = computed(() => {
    const uniqueStatuses = new Set<string>();
    this.targets().forEach((item) => uniqueStatuses.add(item.status));
    this.connectedDropLists = Array.from(uniqueStatuses);
    return Array.from(uniqueStatuses);
  });

  targetsByStatus(status: string): TargetItem[] {
    return this.targets().filter((item) => item.status === status);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Yet To Start':
        return 'text-danger';
      case 'In Progress':
        return 'text-warning';
      case 'Completed':
        return 'text-success';
      default:
        return 'text-secondary';
    }
  }

  constructor(public targetsService: TargetsService) {
    effect(() => {
      this.targets.set(this.targetsService.targets());
    });
  }

  ngOnInit(): void {
    this.targetsService.fetchTargets();
  }

  drop(event: CdkDragDrop<TargetItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const movedItem = event.previousContainer.data[event.previousIndex];

      const newStatus = event.container.id;
      movedItem.status = newStatus;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
