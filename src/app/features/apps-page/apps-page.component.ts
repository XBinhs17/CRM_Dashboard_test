import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardAppsComponent } from '../card-apps/card-apps.component';

@Component({
  selector: 'app-apps-page',
  imports: [
    RouterOutlet,
    CardAppsComponent
  ],
  templateUrl: './apps-page.component.html',
  styleUrl: './apps-page.component.scss'
})
export class AppsPageComponent {
  selectedTab: string = 'Targets';

  onTabChanged(tabName: string){
    this.selectedTab = tabName;
  }
}
