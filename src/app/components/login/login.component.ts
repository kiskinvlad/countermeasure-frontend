import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/AuthenticationService/authentication.service';
import { TokenPayload } from '../../shared/interfaces/token-payload';
import { Router } from '@angular/router';

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  constructor(private auth: AuthenticationService, private router: Router) { }

  login() {
    var authService = this.auth;
    authService.login(this.credentials).subscribe((res) => {
      authService.setRoleID(res.user.role_id);
      console.log("success")
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      console.log(err.error);
    });
  }

  ngOnInit() {

  }

}
