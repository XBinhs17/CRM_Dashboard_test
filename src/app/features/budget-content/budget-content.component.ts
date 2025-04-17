import { CurrentStatus } from './../../shared/types/currentStatus';
import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BudgetService } from '../../services/BudgetService.service';
import { NgIf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
  ],
})
export class BudgetContentComponent {
  value: number = 11000;
  minValue: number = 1000;
  maxValue: number = 50000;
  step: number = 1000;

  get formattedValue(): string {
    return this.value.toFixed(2);
  }

  increase(): void {
    if (this.value + this.step <= this.maxValue) {
      this.value += this.step;
    }
  }

  decrease(): void {
    if (this.value - this.step >= this.minValue) {
      this.value -= this.step;
    }
  }

  currentStatus = signal<CurrentStatus | null>(null);

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
