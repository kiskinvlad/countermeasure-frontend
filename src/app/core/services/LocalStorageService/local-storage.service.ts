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
    this.currentUser.first_name = this.localStorage.retrieve('first_name');
    this.currentUser.last_name = this.localStorage.retrieve('last_name');
    this.currentUser.role_id = this.localStorage.retrieve('role_id');
    this.currentUser.role_name = this.localStorage.retrieve('role_name');
    this.currentUser.org_id = this.localStorage.retrieve('org_id');
    this.currentUser.user_id = this.localStorage.retrieve('user_id');
  }

  /* basic localStorage functions */
  public setItem(item: string, value: String|Number) {
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

  public getUserFirstName(): string {
    return this.currentUser.first_name;
  }

  public getUserLastName(): string {
    return this.currentUser.last_name;
  }

  public getUserRoleID(): string {
    return this.currentUser.role_id;
  }

  public getUserOrgID(): number {
    return this.currentUser.org_id;
  }

  public getUserID(): number {
    return this.currentUser.user_id;
  }

  public getUserData(): User {
    return this.currentUser;
  }

  public setUserData(user) {
    this.setItem('role_name', user.role_name);
    this.setItem('email', user.email);
    this.setItem('first_name', user.first_name);
    this.setItem('last_name', user.last_name);
    this.setItem('role_id', user.role_id);
    this.setItem('org_id', user.org_id);
    this.setItem('user_id', user.user_id);
    this.currentUser = user;
  }

  public removeUserData() {
    this.removeAllItems();
  }
}
