import { Component, Input } from "@angular/core";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: "progress-status",
  templateUrl: "./progress-status.component.html",
  styleUrls: ["./progress-status.component.scss"],
  imports:[
    MatProgressBarModule
  ]
})
export class ProgressStatusComponent{
  @Input() label: string ='';
  @Input() used: number = 0;
  @Input() total: number = 0;
  @Input() remainingTargets: number = 0;

  get progressValue(): number {
    return this.total > 0 ? (this.used / this.total) * 100 : 0;
  }
}
