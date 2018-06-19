import { Injectable } from '@angular/core';
import { User } from '../../../shared/models/user';
import { LocalStorageService as DLSService } from 'ngx-webstorage';
import { environment } from '@environments/environment';

@Injectable()
/**
 * Local Storage Service for user data manipulations
 */
export class LocalStorageService {
/**
 * @param {User} currentUser Logined user data
 */
  private currentUser: User = {};
/**
 * @constructor
 * @param {DLSService} localStorage Local storage handler service
 */
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
/**
 * Save item to the local storage method
 * @param {string} item Item name which must be saved in local storage
 * @param {string | Number} value Item value which must be saved in local storage
 */
  public setItem(item: string, value: String|Number): void {
    return this.localStorage.store(item, value);
  }
/**
 * Get item from the local storage method
 * @param {string} item Local storage item name
 */
  public getItem(item: string): void {
    return this.localStorage.retrieve(item);
  }
/**
 * Remove item from the local storage method
 * @param {string} item Local storage item name
 */
  public clearItem(item: string): void {
    return this.localStorage.clear(item);
  }
/**
 * Remove all items from the local storage method
 */
  public removeAllItems(): void {
    this.localStorage.clear();
    this.currentUser = {};
  }
/**
 * Save authentication token to the local storage method
 * @param {string} token User session token
 */
  public setAuthToken(token: string): void {
    this.setItem('token', token);
    this.currentUser.token = token;
  }
/**
 * Get authentication token from the local storage method
 * @returns {string}
 */
  public getAuthToken(): string {
    return this.currentUser.token;
  }
/**
 * Remove token from the local storage method
 */
  public removeAuthToken(): void {
    this.clearItem('token');
  }
/**
 * Get user email from the local storage method
 * @returns {string}
 */
  public getUserEmail(): string {
    return this.currentUser.email;
  }
/**
 * Get user role from the local storage method
 * @returns {string}
 */
  public getUserRole(): string {
    return this.currentUser.role_name;
  }
/**
 * Get user first name from the local storage method
 * @returns {string}
 */
  public getUserFirstName(): string {
    return this.currentUser.first_name;
  }
/**
 * Get user last name from the local storage
 * @returns {string}
 */
  public getUserLastName(): string {
    return this.currentUser.last_name;
  }
/**
 * Get user role id from the local storage
 * @returns {string}
 */
  public getUserRoleID(): string {
    return this.currentUser.role_id;
  }
/**
 * Get user organization id from the local storage
 * @returns {number}
 */
  public getUserOrgID(): number {
    return this.currentUser.org_id;
  }
/**
 * Get user id from the local storage
 * @returns {number}
 */
  public getUserID(): number {
    return this.currentUser.user_id;
  }
/**
 * Get user data from the local storage
 * @returns {User}
 */
  public getUserData(): User {
    return this.currentUser;
  }
/**
 * Set user data to the local storage
 * @param {User} user User model
 */
  public setUserData(user: User): void {
    this.setItem('role_name', user.role_name);
    this.setItem('email', user.email);
    this.setItem('first_name', user.first_name);
    this.setItem('last_name', user.last_name);
    this.setItem('role_id', user.role_id);
    this.setItem('org_id', user.org_id);
    this.setItem('user_id', user.user_id);
    this.currentUser = user;
  }
/**
 * Remove user data from the local storage
 */
  public removeUserData() {
    this.removeAllItems();
  }
}
