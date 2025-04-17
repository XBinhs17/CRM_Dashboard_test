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
import { NgFor, NgForOf, NgIf } from '@angular/common';
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
    CdkDrag,
    NgFor,
    NgForOf,
    MatIconModule,
    TargetCardComponent,
    MatTableModule,
  ],
})
export class TargetContentComponen implements OnInit{
  selected = new FormControl('recently');

  //state theo dõi đang dùng view nào
  viewMode = signal<'grid' | 'table'>('grid');

  public targets = signal<TargetItem[]>([]);

  displayedColumns: string[] = ['name', 'status', 'updated'];


  //kh fix cứng
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
