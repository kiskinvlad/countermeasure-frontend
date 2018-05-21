import { Injectable } from '@angular/core';
import { User } from '@app/login/models/user';

@Injectable()
export class LocalStorageService {

  private currentUser: User = {};

  constructor() {
    this.currentUser.token = localStorage.getItem('token');
    this.currentUser.email = localStorage.getItem('email');
    this.currentUser.role_name = localStorage.getItem('role_name');
  }

  public getUserToken(): string {
    return this.currentUser.token;
  }

  public getUserEmail(): string {
    return this.currentUser.email;
  }

  public getUserRole(): string {
    return this.currentUser.role_name;
  }

  public getUserData(): User {
    return this.currentUser;
  }

  public setUserData(user) {
    localStorage.setItem('token', user.payload.token);
    localStorage.setItem('role_name', user.payload.role_name);
    localStorage.setItem('email', user.payload.email);

    this.currentUser = user.payload;
  }

  public removeUserData() {
    localStorage.clear();
    this.currentUser = {};
  }
}
