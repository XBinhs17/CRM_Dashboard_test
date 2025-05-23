import { TargetsService } from './../../services/TargetsService.service';
import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import {
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TargetItem } from '../../shared/types/targetItem';
import { TargetCardComponent } from './target-card/target-card.component';
import { MatTableModule } from '@angular/material/table';
import { KanbanColumnComponent } from '../../components/kanban-column/kanban-column.component';
import { NgClass, NgFor } from '@angular/common';

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
    MatIconModule,
    TargetCardComponent,
    MatTableModule,
    KanbanColumnComponent,
    NgFor,
    NgClass,
  ],
})
export class TargetContentComponen implements OnInit {
  selected = new FormControl('recently');

  //state theo dõi đang dùng view nào
  public targets = signal<TargetItem[]>([]);

  connectedDropLists: string[] = [];

  readonly statusList = computed(() => {
    const uniqueStatuses = new Set<string>();
    this.targets().forEach((item) => uniqueStatuses.add(item.status));
    this.connectedDropLists = Array.from(uniqueStatuses);
    console.log('connectedDropLists:', this.connectedDropLists);
    return Array.from(uniqueStatuses);
  });

  targetsByStatus(status: string): TargetItem[] {
    return this.targets().filter((item) => item.status === status);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'YetToStart':
        return 'text-danger';
      case 'InProgress':
        return 'text-warning';
      case 'Completed':
        return 'text-success';
      default:
        return 'text-secondary';
    }
  }

  constructor(public targetsService: TargetsService) {}

  ngOnInit(): void {
    this.targetsService.fetchTargets();
    this.targets.set(this.targetsService.targets());
  }

  drop(event: CdkDragDrop<TargetItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Update the status of the moved item
      const movedItem = event.container.data[event.currentIndex];
      movedItem.status = event.container.id;

      // Update the signal
      this.targets.update(current => [...current]);
    }
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   console.log('drop event:', event);
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }
}
