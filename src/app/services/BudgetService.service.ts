import { effect, Injectable, signal } from "@angular/core";
import { CurrentStatus } from "../shared/types/currentStatus";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class BudgetService{

  private _budget = signal<CurrentStatus[]>([]);
  budget =  this._budget.asReadonly();

  constructor(private http: HttpClient){}

  fetchBudget(): void{
    this.http.get<CurrentStatus[]>('assets/data/current-status.json').subscribe(data =>{
      this._budget.set(data);
    })
  }
}
