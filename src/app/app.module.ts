import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LocalStorageService as DLSService } from 'ngx-webstorage';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { LoginComponent } from '@app/pages/login/login.component';
import { DashboardCaseComponent } from '@app/pages/dashboard-case/dashboard-case.component';
import { AuthenticationService } from '@app/core/services/AuthenticationService/authentication.service';
import { RoleService } from '@app/core/services/UserRoleService/role.service';
import { LocalStorageService } from '@core/services/LocalStorageService/local-storage.service';
import { CasesService } from '@app/core/services/CasesService/cases.service';
import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';
import { AuthEffects } from '@app/shared/ngrx-store/effects/auth.effects';
import { reducers } from '@app/shared/ngrx-store/app.states';
import { CasesEffects } from '@app/shared/ngrx-store/effects/cases.effects';
import { CategoryEffects } from '@app/shared/ngrx-store/effects/category.effects';
import { AuthGuardService } from '@app/shared/guard/auth-guard.service';
import { NavigationBarComponent } from '@app/shared/components/navigation-bar/navigation-bar.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { SideBarComponent } from '@app/shared/components/sidebar/sidebar.component';
import { EditCategoriesComponent } from './pages/edit-categories/edit-categories.component';
import { CategoryService } from '@app/core/services/CategoryService/category.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardCaseComponent,
    NavigationBarComponent,
    SideBarComponent,
    EditCategoriesComponent
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
    EffectsModule.forRoot([AuthEffects, CasesEffects, CategoryEffects]),
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
    CategoryService,
    JwtHelperService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
