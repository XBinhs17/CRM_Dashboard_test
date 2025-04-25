import {
  Component,
  Input,
  TemplateRef,
  signal,
  input
} from '@angular/core';
import { CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { NgClass, NgFor, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'kanban-column',
  standalone: true,
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
  imports: [NgClass, NgFor, CdkDropList, NgTemplateOutlet],
})
export class KanbanColumnComponent {
  status = input<string>('');
  items = input<any[]>([]);
  connectedDropLists = input<string[]>([]);
  getStatusClass = input<(status: string) => string>(() => '');
  dropFn = input<(event: CdkDragDrop<any[]>) => void>(() => {});
  itemTemplate = input<TemplateRef<any> | null>(null);
}
