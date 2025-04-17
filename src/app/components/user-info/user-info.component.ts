import { Component, Input } from "@angular/core";
import { AvatarComponent } from "../avatar/avatar.component";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"],
  imports: [
    AvatarComponent
  ]
})
export class UserInfoComponent{
  @Input() avatar: string = '';
  @Input() name: string ='';
  @Input() work: string = '';
  @Input() avatarSize: number = 25;
}
