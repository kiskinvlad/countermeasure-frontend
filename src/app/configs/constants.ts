import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    private server = 'http://localhost:3000/';
    public USERS_API_ENDPOINT =  this.server + 'users';
    public ROLES_API_ENDPOINT = this.server + 'roles';
}
