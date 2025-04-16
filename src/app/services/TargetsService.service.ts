import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { TargetItem } from "../shared/types/targetItem";
import { ResponseData } from "../shared/types/responData";



@Injectable({providedIn: 'root'})
export class TargetsService{
  constructor(private http: HttpClient) {}

  getTargets(): Observable<TargetItem[]>{
    return this.http.get<TargetItem[]>('assets/data/data-target.json');
  }
}
