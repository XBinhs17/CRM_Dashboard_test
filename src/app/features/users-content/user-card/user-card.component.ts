import { Component, Input } from '@angular/core';
import { UserItem } from '../../../shared/types/userItem';
import { AvatarComponent } from '../../../components/avatar/avatar.component';
import { UserInfoComponent } from '../../../components/user-info/user-info.component';
import { StatBoxComponent } from '../../../components/stat-box/stat-box.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  imports:[
    UserInfoComponent,
    StatBoxComponent
  ]
})
export class UserCardComponent {
  @Input() user: any;
}
