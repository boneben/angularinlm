import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _apiurl: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  public login(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/login`, userInfo);
  }

  public register(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/register`, userInfo);
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('USER_EMAIL');
  }

  public getUser() {
    let id = localStorage.getItem("USER_ID");
    return this.http.get(`${this._apiurl}/users/${id}`);
  }

  public updateUser(userInfo: User) {
    let id = localStorage.getItem("USER_ID");
    return this.http.put(`${this._apiurl}/users/update/${id}`, userInfo);
  } 
}