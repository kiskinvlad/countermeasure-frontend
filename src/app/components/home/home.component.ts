import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/AuthenticationService/authentication.service';

@Component({
  selector: 'ct-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private user_role: string;
  constructor(private auth: AuthenticationService) { }

  logout() {
    this.auth.logout();
  }

  getUserRole() {
    switch (JSON.parse(localStorage.getItem('role'))) {
      case 1: this.user_role = 'admin'; break;
      case 2: this.user_role = 'manager'; break;
      case 3: this.user_role =  'user'; break;
    }
    return this.user_role;
  }

  ngOnInit() {
  }

}
