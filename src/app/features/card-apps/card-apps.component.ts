import { Component, EventEmitter, Output, ViewChild, ViewContainerRef, Type, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { TargetContentComponen } from './../targets-content/target-content.component';
import { BudgetContentComponent } from '../budget-content/budget-content.component';
import { UsersContentComponent } from '../users-content/users-content.component';

@Component({
  selector: 'card-apps',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterModule,
    MatIconModule,
    AvatarComponent
  ],
  templateUrl: './card-apps.component.html',
  styleUrls: ['./card-apps.component.scss']
})
export class CardAppsComponent {
  @ViewChild('container', { read: ViewContainerRef, static: false }) container!: ViewContainerRef;
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

  // Mapping tab names to components
  tabComponentMapping = {
    'Targets': TargetContentComponen,
    'Budget': BudgetContentComponent,
    'Users': UsersContentComponent
  }

  constructor() { }

  selectTab(tab: string) {
    const selectedTab = tab as keyof typeof this.tabComponentMapping;
    this.selectedTab = selectedTab;
    this.tabChanged.emit(selectedTab);
    this.createDynamicComponent(selectedTab);
  }

  createDynamicComponent(tab: keyof typeof this.tabComponentMapping) {
    this.container.clear();

    const component: Type<any> = this.tabComponentMapping[tab];

    if (component) {
      this.container.createComponent(component);
    }
  }
}
