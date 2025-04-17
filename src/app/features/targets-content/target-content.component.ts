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
export class TargetContentComponen implements OnInit{
  selected = new FormControl('recently');

  private targets = signal<TargetItem[]>([]);

  readonly yetToStart = computed(() =>
    this.targets().filter(t => t.status === 'Yet To Start')
  )
  readonly inProgress = computed(() =>
    this.targets().filter(t => t.status === 'In Progress')
  )
  readonly completed = computed(() =>
    this.targets().filter(t => t.status === 'Completed')
  )

  constructor(public targetsService: TargetsService){
    effect(() =>{
      this.targets.set(this.targetsService.targets());
    })
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
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}
