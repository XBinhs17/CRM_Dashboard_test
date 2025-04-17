import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from '../../../components/avatar/avatar.component';

@Component({
  selector: 'targets-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    NgFor,
    AvatarComponent
  ],
})
export class TargetCardComponent {
  @Input() task: any;
}
