import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Role } from '@login/models/role';
import { AppState, selectRoleState } from '../app.states';
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
export class DashboardComponent implements OnInit, OnDestroy {

  getState: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private permissionsService: NgxPermissionsService
  ) {
    this.getState = this.store.select(selectRoleState);
  }

  logout() {
    this.store.dispatch(new LogOut);
  }

  ngOnInit() {
    this.subscription = this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    const user_role = localStorage.getItem('role_name').split(' ');
    this.permissionsService.loadPermissions(user_role);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
