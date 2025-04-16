import { Component, OnInit } from '@angular/core';
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
import { TargetsService } from '../../services/TargetsService.service';
import { NgFor, NgForOf } from '@angular/common';
import { TargetCardComponent } from './target-card/target-card.component';

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
    CdkDrag,
    NgFor,
    MatIconModule,
    NgForOf,
    TargetCardComponent
  ],
})
export class TargetContentComponent implements OnInit {
  selected = new FormControl('recently');

  yetToStart: TargetItem[] = [];
  inProgress: TargetItem[] = [];
  completed: TargetItem[] = [];

  constructor(private targetsService: TargetsService) {}

  ngOnInit(): void {
    this.targetsService.getTargets().subscribe((data) => {
      const flatData = data.flatMap(item => Array.isArray(item) ? item : [item]);

      this.yetToStart = flatData.filter(item => item.status === 'Yet To Start');
      this.inProgress = flatData.filter(item => item.status === 'In Progress');
      this.completed = flatData.filter(item => item.status === 'Completed');
    });
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
    }
  }

}
