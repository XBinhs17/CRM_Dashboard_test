import { NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.compoent.html',
  styleUrls: ['./avatar.component.scss'],
  imports:[NgStyle]
})
export class AvatarComponent{
  @Input() src: string = '';
  @Input() size: number = 25;
}
