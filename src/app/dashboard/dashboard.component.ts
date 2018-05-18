import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@login/store/app.states';
import { LogOut } from '@login/store/actions/auth.actions';
import { State } from '@app/login/store/reducers/auth.reducers';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'ct-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private user_role: string[];

  constructor(
    private store: Store<AppState>,
    private permissionsService: NgxPermissionsService
  ) {

  }

  logout() {
    this.store.dispatch(new LogOut);
  }

  ngOnInit() {
    this.user_role = localStorage.getItem('role_name').split(' ');
    this.permissionsService.loadPermissions(this.user_role);
  }

}
