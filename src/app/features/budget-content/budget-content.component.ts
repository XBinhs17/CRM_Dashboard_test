import { CurrentStatus } from './../../shared/types/currentStatus';
import {
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BudgetService } from '../../services/BudgetService.service';
import { NgIf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { QuantityInputComponent } from '../../components/quantity-input/quantity-input.component';
@Component({
  selector: 'budget-content',
  templateUrl: './budget-content.component.html',
  styleUrls: ['./budget-content.component.scss'],
  imports: [
    MatIconModule,
    MatProgressBarModule,
    NgIf,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    QuantityInputComponent,
  ],
})
export class BudgetContentComponent {
  value = signal(11000);

  currentStatus = signal<CurrentStatus | null>(null);

  onValueChange(val: number) {
    this.value.set(val);
  }

  constructor(private budgetService: BudgetService) {
    effect(() => {
      const data = this.budgetService.budget();
      this.currentStatus.set(data.length > 0 ? data[0] : null);
    });
  }

  ngOnInit(): void {
    this.budgetService.fetchBudget();
  }

  progressValue = computed(() => {
    const status = this.currentStatus();
    return status ? (status.used / status.total) * 100 : 0;
  });
}
