import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CdkDropList, CdkDropListGroup, CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'kanban-column',
  standalone: true,
  imports: [CdkDropList, CdkDropListGroup, NgFor, NgClass],
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss']
})
export class KanbanColumnComponent {
  @Input() status!: string;
  @Input() items: any[] = [];
  @Input() connectedDropLists: string[] = [];
  @Input() getStatusClass!: (status: string) => string;
  @Output() itemDropped = new EventEmitter<CdkDragDrop<any[]>>();

  onDrop(event: CdkDragDrop<any[]>) {
    this.itemDropped.emit(event);
  }
}
