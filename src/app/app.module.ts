import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorageService as DLSService } from 'ngx-webstorage';
import { ModalModule } from 'ngx-bootstrap';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { LoginComponent } from '@app/pages/login/login.component';
import { SideBarComponent } from '@app/shared/components/sidebar/sidebar.component';
import { DashboardCaseComponent } from '@app/pages/dashboard-case/dashboard-case.component';
import { AuthenticationService } from '@app/core/services/AuthenticationService/authentication.service';
import { UserService } from '@app/core/services/UserService/user.service';
import { NavigationBarComponent } from '@app/shared/components/navigation-bar/navigation-bar.component';
import { reducers } from '@app/shared/ngrx-store/app.states';
import { AuthEffects } from '@app/shared/ngrx-store/effects/auth.effects';
import { CasesEffects } from '@app/shared/ngrx-store/effects/cases.effects';
import { CategoryEffects } from '@app/shared/ngrx-store/effects/category.effects';
import { AuthGuardService } from '@app/shared/guard/auth-guard.service';
import { RoleService } from '@app/core/services/UserRoleService/role.service';
import { CasesService } from '@app/core/services/CasesService/cases.service';
import { CategoryService } from '@app/core/services/CategoryService/category.service';
import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';
import { UserEffects } from '@app/shared/ngrx-store/effects/user.effects';
import { AppRoutingModule } from '@app/app-routing.module';
import { EditDetailsComponent as MyProfileEditDetailsComponent } from '@app/pages/my-profile/edit-details/edit-details.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LocalStorageService } from '@core/services/LocalStorageService/local-storage.service';
import { EditCategoriesComponent } from './pages/edit-categories/edit-categories.component';
import { DialogCreateCaseComponent } from './pages/dashboard-case/dialog-create-case/dialog-create-case.component';
import { AddEditCategoryComponent } from '@app/pages/edit-categories/add-edit-category/add-edit-category.component';
import { DisputesService } from '@app/core/services/DisputesService/disputes.service';
import { DisputesEffects } from '@app/shared/ngrx-store/effects/disputes.effects';
import { EditCasesComponent } from './pages/edit-cases/edit-cases.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ChangePasswordComponent } from './pages/my-profile/change-password/change-password.component';
import { SummaryCategoriesComponent } from './pages/summary-categories/summary-categories.component';
import { EditTaxesComponent } from './pages/edit-taxes/edit-taxes.component';
import { AddEditTaxComponent } from './pages/edit-taxes/add-edit-tax/add-edit-tax.component';
import { OrganizationEffects } from '@app/shared/ngrx-store/effects/organization.effects';
import { OrganizationService } from '@app/core/services/OrganizationService/organization.service';
import { OrganizationComponent } from './pages/organization/organization.component';
import { EditDetailsComponent as OrgEditDetailsComponent } from './pages/organization/edit-details/edit-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardCaseComponent,
    NavigationBarComponent,
    SideBarComponent,
    MyProfileEditDetailsComponent,
    EditCategoriesComponent,
    DialogCreateCaseComponent,
    AddEditCategoryComponent,
    EditCasesComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    SummaryCategoriesComponent,
    EditTaxesComponent,
    AddEditTaxComponent,
    EditCasesComponent,
    OrganizationComponent,
    OrgEditDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    NgSelectModule,
    HttpModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot(reducers, {}),
    BrowserAnimationsModule,
    EffectsModule.forRoot([AuthEffects, CasesEffects, UserEffects, CategoryEffects, DisputesEffects, OrganizationEffects]),
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    ApiRoutingService,
    RoleService,
    DLSService,
    HttpHelperService,
    LocalStorageService,
    CasesService,
    UserService,
    CategoryService,
    JwtHelperService,
    NgxPermissionsService,
    BsModalService,
    DisputesService,
    OrganizationService
  ],
  entryComponents: [
    AddEditTaxComponent,
    DialogCreateCaseComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
