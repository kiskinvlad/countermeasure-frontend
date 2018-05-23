import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/AuthenticationService/authentication.service';
@Component({
  selector: 'ct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth: AuthenticationService) {}
  title = 'ct';
}
