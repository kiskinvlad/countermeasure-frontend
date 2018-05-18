import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '@login/services/authentication/authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
