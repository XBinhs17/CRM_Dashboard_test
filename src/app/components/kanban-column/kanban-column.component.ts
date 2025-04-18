import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
  imports: [
    NgClass,
    DragDropModule,
    NgFor,
    CdkDropList,
    NgClass,
    NgIf,
    NgFor,
    NgTemplateOutlet,
  ],
})
export class KanbanColumnComponent {
  @Input() title!: string;
  @Input() item: any[] = [];
  @Input() connectedDropLists: string[] = [];
  @Input() getTitleClass!: (status: string) => string;
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() enableDragDrop: boolean = true;

  @Output() dropped = new EventEmitter<CdkDragDrop<any[]>>();

  onDrop(event: CdkDragDrop<any[]>) {
    console.log('Previous Container:', event.previousContainer);
      console.log('Current Container:', event.container);
      console.log('Moved Item:', event.item.data);

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

      // Cập nhật dữ liệu trong item của cột đích
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    // Emit sự kiện dropped để thông báo cho component cha
    this.dropped.emit(event);
  }

  sanitizeId(value: string): string {
    return value.toLowerCase().replace(/\s+/g, '-');
  }
}
