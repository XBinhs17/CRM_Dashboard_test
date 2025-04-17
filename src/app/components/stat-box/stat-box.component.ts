import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-stat-box',
  templateUrl: './stat-box.component.html',
  styleUrls: ['./stat-box.component.scss']
})
export class StatBoxComponent{
  @Input() value: string | number ='';
  @Input() label: string = '';
}
