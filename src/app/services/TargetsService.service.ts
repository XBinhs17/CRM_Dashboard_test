import { effect, Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { TargetItem } from "../shared/types/targetItem";
import { ResponseData } from "../shared/types/responData";



@Injectable({providedIn: 'root'})
export class TargetsService{
  private _targets = signal<TargetItem[]>([]);
  readonly targets = this._targets.asReadonly();

  constructor(private http: HttpClient){
    //tự động gọi API và cập nhật target
    effect(() =>{
      this.http.get<TargetItem[]>('assets/data/data-target.json').subscribe(data =>{
        this._targets.set(data);
      })
    })
  }

  //pt lấy dữ liệu rả về Obs
  getTargets(): Observable<TargetItem[]>{
    return this.http.get<TargetItem[]>('assets/data/data-target.json');
  }

  //pt trả về giá trị hiện tại của targets
  getTargetsSignal(): TargetItem[]{
    return this._targets();
  }
}
