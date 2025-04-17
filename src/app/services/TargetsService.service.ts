import { effect, Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, single } from "rxjs";
import { TargetItem } from "../shared/types/targetItem";
import { ResponseData } from "../shared/types/responData";



@Injectable({providedIn: 'root'})
export class TargetsService{

  private _targets = signal<TargetItem[]>([]);
  targets = this._targets.asReadonly();

  constructor(private http: HttpClient){}

  fetchTargets() : void{
    this.http.get<TargetItem[]>('assets/data/data-target.json').subscribe(data => {
      this._targets.set(data);
  })
  }
}
