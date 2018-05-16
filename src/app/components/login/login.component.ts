import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TokenPayload } from '../../interfaces/token-payload';
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
    this.auth.login(this.credentials).subscribe((res) => {
      localStorage.setItem('role', res.user.role_id);
      this.router.navigateByUrl('/');
    }, (err) => {
      console.log(err.error);
    });
  }

  ngOnInit() {
  }

}
