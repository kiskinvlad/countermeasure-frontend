import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocalStorageService as DLSService } from 'ngx-webstorage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationService } from './core/services/AuthenticationService/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './shared/guard/auth-guard.service';
import { DashboardCaseComponent } from './pages/dashboard-case/dashboard-case.component';
import { HttpHelperService } from './core/http-helper.service';
import { LocalStorageService } from './core/services/LocalStorageService/local-storage.service';
import { ApiRoutingService } from './core/api-routing.service';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './shared/ngrx-store/app.states';
import { AuthEffects } from './shared/ngrx-store/effects/auth.effects';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { RoleService } from './core/services/UserRoleService/role.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardCaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    AuthenticationService, 
    HttpHelperService, 
    DLSService,
    LocalStorageService, 
    ApiRoutingService, 
    AuthGuardService,
    RoleService, 
    NgxPermissionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
