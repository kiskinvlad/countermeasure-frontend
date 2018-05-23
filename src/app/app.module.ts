import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LocalStorageService as DLSService } from 'ngx-webstorage';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

import { AuthenticationService } from './core/services/AuthenticationService/authentication.service';
import { HttpHelperService } from './core/http-helper.service';
import { LocalStorageService } from './core/services/LocalStorageService/local-storage.service';
import { ApiRoutingService } from './core/api-routing.service';
import { RoleService } from './core/services/UserRoleService/role.service';
import { CasesService } from './core/services/CasesService/cases.service';


import { AuthGuardService } from './shared/guard/auth-guard.service';
import { reducers } from './shared/ngrx-store/app.states';
import { AuthEffects } from './shared/ngrx-store/effects/auth.effects';
import { CasesEffects } from './shared/ngrx-store/effects/cases.effects';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardCaseComponent } from './pages/dashboard-case/dashboard-case.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



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
    AngularFontAwesomeModule,
    HttpModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects, CasesEffects]),
  ],
  providers: [
    AuthenticationService, 
    HttpHelperService, 
    DLSService,
    LocalStorageService, 
    ApiRoutingService, 
    AuthGuardService,
    RoleService, 
    CasesService,
    NgxPermissionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
