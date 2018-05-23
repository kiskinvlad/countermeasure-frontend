import { Injectable } from '@angular/core';
import { User } from '../../../shared/models/user';
import { LocalStorageService as DLSService } from 'ngx-webstorage';
import { environment } from '@environments/environment';

@Injectable()
export class LocalStorageService {

  private currentUser: User = {};

  constructor(
    private localStorage: DLSService
  ) {
    this.currentUser.token = this.localStorage.retrieve('token');
    this.currentUser.email = this.localStorage.retrieve('email');
    this.currentUser.role_name = this.localStorage.retrieve('role_name');
  }

  /* basic localStorage functions */
  public setItem(item: string, value: String) {
    return this.localStorage.store(item, value);
  }

  public getItem(item: string) {
    return this.localStorage.retrieve(item);
  }

  public clearItem(item: string) {
    return this.localStorage.clear(item);
  }

  public removeAllItems() {
    this.localStorage.clear();
    this.currentUser = {};
  }

  /* Authentication functions */
  public setAuthToken(token: string) {
    this.setItem('token', token);
    this.currentUser.token = token;
  }

  public getAuthToken(): string {
    return this.currentUser.token;
  }

  public removeAuthToken(): void {
    this.clearItem('token');
  }

  /* User informations */
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
    this.setItem('role_name', user.role_name);
    this.setItem('email', user.email);
    this.currentUser = user;
  }

  public removeUserData() {
    this.removeAllItems();
  }
}