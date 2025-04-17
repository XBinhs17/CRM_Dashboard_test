import { Component, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'header-layout',
  standalone: true,
  templateUrl: './users-content.component.html',
  styleUrls: ['./users-content.component.scss'],
  imports: [
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule
  ],
})
export class UsersContentComponent {
  selected1 = new FormControl('recently');
  selected2 = new FormControl('excel');
}
