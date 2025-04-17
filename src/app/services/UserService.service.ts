import { effect, Injectable, signal } from "@angular/core";
import { UserItem } from "../shared/types/userItem";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({providedIn: 'root'})
export class UsersService{

  //đồng nhất dùng signal
  private _users = signal<UserItem[]>([]);
  users = this._users.asReadonly();

  constructor(private http: HttpClient){}

  fetchUsers(): void{
    this.http.get<UserItem[]>('assets/data/data-users.json').subscribe(data => {
      this._users.set(data)
    })
  }
}
