import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'quantity-input',
  templateUrl: './quantity-input.component.html',
  styleUrls: ['./quantity-input.component.scss']
})
export class QuantityInputComponent{
  @Input() value: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number =1;

  @Output() valueChange = new EventEmitter<number>();

  increase(): void {
    if (this.value + this.step <= this.max) {
      this.value += this.step;
      this.valueChange.emit(this.value);
    }
  }

  decrease(): void {
    if (this.value - this.step >= this.min) {
      this.value -= this.step;
      this.valueChange.emit(this.value);
    }
  }
}
