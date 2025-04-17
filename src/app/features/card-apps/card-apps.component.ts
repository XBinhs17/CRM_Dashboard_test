import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'card-apps',
  imports: [
    NgFor,
    NgIf,
    RouterModule,
    [MatIconModule]
  ],
  templateUrl: './card-apps.component.html',
  styleUrl: './card-apps.component.scss'
})
export class CardAppsComponent {
  @Output() tabChanged = new EventEmitter<string>();

  users = [
    { avatar: 'https://i.pravatar.cc/150?img=1' },
    { avatar: 'https://i.pravatar.cc/150?img=2' },
    { avatar: 'https://i.pravatar.cc/150?img=3' },
    { avatar: 'https://i.pravatar.cc/150?img=4' },
    { avatar: 'https://i.pravatar.cc/150?img=5' },
    { avatar: 'https://i.pravatar.cc/150?img=6' },
    { avatar: 'https://i.pravatar.cc/150?img=1' },
    { avatar: 'https://i.pravatar.cc/150?img=2' },
    { avatar: 'https://i.pravatar.cc/150?img=3' },
    { avatar: 'https://i.pravatar.cc/150?img=4' },
    { avatar: 'https://i.pravatar.cc/150?img=5' },
    { avatar: 'https://i.pravatar.cc/150?img=6' },
    { avatar: 'https://i.pravatar.cc/150?img=1' },
    { avatar: 'https://i.pravatar.cc/150?img=2' },
    { avatar: 'https://i.pravatar.cc/150?img=3' },
    { avatar: 'https://i.pravatar.cc/150?img=4' },
    { avatar: 'https://i.pravatar.cc/150?img=5' },
    { avatar: 'https://i.pravatar.cc/150?img=6' },
  ];

  maxVisible = 8;

  get visibleUsers() {
    return this.users.slice(0, this.maxVisible);
  }

  get extraCount() {
    return this.users.length - this.maxVisible;
  }

  tabs = ['Overview', 'Targets', 'Budget', 'Users', 'Files', 'Activity', 'Settings'];
  selectedTab = this.tabs[1];

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.tabChanged.emit(tab);
  }
}
