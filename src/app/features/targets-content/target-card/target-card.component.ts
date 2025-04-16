import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'targets-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    NgFor
  ],
})
export class TargetCardComponent {
  @Input() task: any;
}
