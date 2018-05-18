import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '@login/login.component';
import { AuthenticationService } from '@login/services/authentication/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { AuthGuardService } from '@login/services/guard/auth-guard.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './app.states';
import { AuthEffects } from '@login/store/effects/auth.effects';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { RoleService } from '@app/login/services/role/role.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [AuthenticationService, AuthGuardService, RoleService, NgxPermissionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
