import { Component, Input, Output, EventEmitter, signal, input, output } from "@angular/core";
import { CurrencyFormatPipe } from "../../shared/pipes/currency.pipe";

@Component({
  selector: 'quantity-input',
  standalone: true,
  templateUrl: './quantity-input.component.html',
  styleUrls: ['./quantity-input.component.scss'],
  imports: [
    CurrencyFormatPipe
  ]
})
export class QuantityInputComponent{

  value = input<number>(0);
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  currencyFormat = input<string>('USD');

  //old
  // @Output() valueChange = new EventEmitter<number>();

  //new
  valueChange = output<number>();

  increase(): void {
    const newValue = this.value() + this.step();
    if (newValue <= this.max()) {
      this.valueChange.emit(newValue);
    }
  }

  decrease(): void {
    const newValue = this.value() - this.step();
    if (newValue >= this.min()) {
      this.valueChange.emit(newValue);
    }
  }

}
