import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { Observable } from 'rxjs';
import { IUserLogin } from '../models/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:3001/user";

  constructor( private _httpClient: HttpClient) { }

  public postUser(user: IUser): Observable<IUser>{
    console.log(user)
    return this._httpClient.post<IUser>(`${this.baseURL}`, user)
  }
  public loginUser(user: IUserLogin): Observable<IUserLogin>{
    console.log(user)
    return this._httpClient.post<IUserLogin>(`${this.baseURL}/login`, user)
  }

 getAvatarFromLocalStorage(): string { 
  const avatar = localStorage.getItem('avatar'); 
  return avatar ? avatar : ""; 
}
  getFullNameFromLocalStorage(): string {
    const fullname = localStorage.getItem('fullname');
    return fullname ? fullname : "";
  }

  getUser(): string { 
    const username = localStorage.getItem('username'); 
    return username ? username : ""; 
  }
}
