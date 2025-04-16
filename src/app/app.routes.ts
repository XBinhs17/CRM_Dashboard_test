import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AppsPageComponent } from './features/apps-page/apps-page.component';
import { TargetContentComponent } from './features/targets-content/target-content.component';
import { BudgetContentComponent } from './features/budget-content/budget-content.component';

export const routes: Routes = [
  {
    path:'',
    component: AppsPageComponent,
    children: [
      {path: 'targets', component: TargetContentComponent},
      {path: 'budget', component: BudgetContentComponent},
    ]
  }
];
