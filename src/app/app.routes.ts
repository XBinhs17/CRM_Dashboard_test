import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AppsPageComponent } from './features/apps-page/apps-page.component';
import { BudgetContentComponent } from './features/budget-content/budget-content.component';
import { TargetContentComponen } from './features/targets-content/target-content.component';
import { UsersContentComponent } from './features/users-content/users-content.component';

export const routes: Routes = [
  {
    path:'',
    component: AppsPageComponent,
    children: [
      {path: 'targets', component: TargetContentComponen},
      {path: 'budget', component: BudgetContentComponent},
      {path: 'users', component: UsersContentComponent},
    ]
  }
];
