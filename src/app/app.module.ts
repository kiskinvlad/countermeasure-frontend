import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LocalStorageService as DLSService } from 'ngx-webstorage';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { AppComponent } from './app.component';
import { LoginComponent } from '@app/pages/login/login.component';
import { DashboardCaseComponent } from '@app/pages/dashboard-case/dashboard-case.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from '@app/core/services/AuthenticationService/authentication.service';
import { RoleService } from '@app/core/services/UserRoleService/role.service';
import { LocalStorageService } from '@core/services/LocalStorageService/local-storage.service';
import { CasesService } from '@app/core/services/CasesService/cases.service';
import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@app/shared/ngrx-store/effects/auth.effects';
import { reducers } from '@app/shared/ngrx-store/app.states';
import { CasesEffects } from '@app/shared/ngrx-store/effects/cases.effects';
import { AuthGuardService } from '@app/shared/guard/auth-guard.service';
import { NavigationBarComponent } from '@app/shared/components/navigation-bar/navigation-bar.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { SideBarComponent } from '@app/shared/components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardCaseComponent,
    NavigationBarComponent,
    SideBarComponent
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
    AuthGuardService,
    ApiRoutingService,
    RoleService,
    DLSService,
    HttpHelperService,
    NgxPermissionsService,
    LocalStorageService,
    CasesService,
    NgxPermissionsService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
