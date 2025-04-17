import { effect, Injectable, signal } from "@angular/core";
import { CurrentStatus } from "../shared/types/currentStatus";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class BudgetService{
  private _budget = signal<CurrentStatus[]>([]);
  readonly budget = this._budget.asReadonly();

  constructor(private http: HttpClient){
    effect(() =>{
      this.http.get<CurrentStatus[]>('assets/data/current-status.json').subscribe(data =>{
        this._budget.set(data);
      })
    })
  }

  getCurrentStatus(): Observable<CurrentStatus[]>{
    return this.http.get<CurrentStatus[]>('assets/data/current-status.json');
  }

  getCurrentStatusSignal(): CurrentStatus[]{
    return this._budget();
  }
}
