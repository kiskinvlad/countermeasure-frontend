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
    return this.auth.getRole();
  }

  ngOnInit() {
  }
}
