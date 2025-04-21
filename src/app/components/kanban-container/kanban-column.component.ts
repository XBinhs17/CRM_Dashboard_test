import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CdkDropList, CdkDropListGroup, CdkDragDrop } from '@angular/cdk/drag-drop';
import { NgClass, NgIf, NgFor, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
  standalone: true,
  imports: [
    CdkDropList,
    CdkDropListGroup,
    NgClass,
  ],
})
export class KanbanColumnComponent {
  @Input() status: string = '';
  @Input() itemCount: number = 0;
  @Input() dropListData: any[] = [];
  @Input() connectedDropLists: string[] = [];
  @Input() headerClass: string = '';

  @Output() itemDropped = new EventEmitter<CdkDragDrop<any[]>>();

  onDrop(event: CdkDragDrop<any[]>) {
    // Emit sự kiện khi có sự kiện kéo thả
    this.itemDropped.emit(event);
  }
}
