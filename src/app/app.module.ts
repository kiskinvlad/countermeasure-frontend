import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorageService as DLSService } from 'ngx-webstorage';
import { LocalStorageService } from '@core/services/LocalStorageService/local-storage.service';
import { ModalModule } from 'ngx-bootstrap';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '@app/pages/login/login.component';
import { SideBarComponent } from '@app/shared/components/sidebar/sidebar.component';
import { DashboardCaseComponent } from '@app/pages/dashboard-case/dashboard-case.component';
import { NavigationBarComponent } from '@app/shared/components/navigation-bar/navigation-bar.component';
import { EditCategoriesComponent } from './pages/edit-categories/edit-categories.component';
import { DialogCreateCaseComponent } from './pages/dashboard-case/dialog-create-case/dialog-create-case.component';
import { AddEditCategoryComponent } from '@app/pages/edit-categories/add-edit-category/add-edit-category.component';
import { EditDetailsComponent as MyProfileEditDetailsComponent } from '@app/pages/my-profile/edit-details/edit-details.component';
import { EditCasesComponent } from './pages/edit-cases/edit-cases.component';
import { EditScenariosComponent } from './pages/edit-scenarios/edit-scenarios.component';
import { EditTaxesComponent } from '@app/pages/edit-taxes/edit-taxes.component';
import { AddEditTaxComponent } from '@app/pages/edit-taxes/add-edit-tax/add-edit-tax.component';
import { AddEditScenarioComponent } from './pages/edit-scenarios/add-edit-scenario/add-edit-scenario.component';
import { SummaryCategoriesComponent } from './pages/summary-categories/summary-categories.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ChangePasswordComponent } from './pages/my-profile/change-password/change-password.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { EditDetailsComponent as OrgEditDetailsComponent } from './pages/organization/edit-details/edit-details.component';
import { AmountInDisputeComponent } from './pages/reports/amount-in-dispute/amount-in-dispute.component';
import { SummaryScenariosComponent } from './pages/summary-scenarios/summary-scenarios.component';
import { MembersComponent } from './pages/organization/members/members.component';
import { SummaryTaxesComponent } from './pages/summary-taxes/summary-taxes.component';
import { IssuesInDisputeComponent } from './pages/reports/issues-in-dispute/issues-in-dispute.component';
import { EditMemberComponent } from './pages/organization/edit-member/edit-member.component';
import { GuestsComponent } from './pages/organization/guests/guests.component';
import { EditGuestComponent } from './pages/organization/edit-guest/edit-guest.component';
import { DashboardOrganizationsComponent } from './pages/dashboard-organizations/dashboard-organizations.component';

import { reducers } from '@app/shared/ngrx-store/app.states';
import { AuthEffects } from '@app/shared/ngrx-store/effects/auth.effects';
import { CasesEffects } from '@app/shared/ngrx-store/effects/cases.effects';
import { CategoryEffects } from '@app/shared/ngrx-store/effects/category.effects';
import { DisputesEffects } from '@app/shared/ngrx-store/effects/disputes.effects';
import { ScenarioEffects } from '@app/shared/ngrx-store/effects/scenario.effects';
import { UserEffects } from '@app/shared/ngrx-store/effects/user.effects';
import { OrganizationEffects } from '@app/shared/ngrx-store/effects/organization.effects';
import { CsvEffects } from '@app/shared/ngrx-store/effects/csv.effects';
import { PermissionEffects } from '@app/shared/ngrx-store/effects/permission.effects';

import { UserService } from '@app/core/services/UserService/user.service';
import { AuthenticationService } from '@app/core/services/AuthenticationService/authentication.service';
import { AuthGuardService } from '@app/shared/guard/auth-guard.service';
import { DashboardGuardService } from '@app/shared/guard/dashboard-guard.service';
import { RoleService } from '@app/core/services/UserRoleService/role.service';
import { CasesService } from '@app/core/services/CasesService/cases.service';
import { CategoryService } from '@app/core/services/CategoryService/category.service';
import { ApiRoutingService } from '@app/core/api-routing.service';
import { HttpHelperService } from '@app/core/http-helper.service';
import { DisputesService } from '@app/core/services/DisputesService/disputes.service';
import { ScenarioService } from '@app/core/services/ScenarioService/scenario.service';
import { OrganizationService } from '@app/core/services/OrganizationService/organization.service';
import { CsvService } from '@app/core/services/CsvService/csv.service';
import { PermissionService } from '@app/core/services/PermissionService/permission.service';
import { AnticipatedLitigationComponent } from './pages/reports/anticipated-litigation/anticipated-litigation.component';
import { DialogCreateOrgComponent } from './pages/dashboard-organizations/dialog-create-org/dialog-create-org.component';
import { PrincipledSettlementComponent } from './pages/reports/principled-settlement/principled-settlement.component';

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
    EditScenariosComponent,
    EditTaxesComponent,
    AddEditTaxComponent,
    AddEditScenarioComponent,
    SummaryCategoriesComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    OrganizationComponent,
    OrgEditDetailsComponent,
    AmountInDisputeComponent,
    IssuesInDisputeComponent,
    SummaryScenariosComponent,
    MembersComponent,
    SummaryTaxesComponent,
    OrgEditDetailsComponent,
    EditMemberComponent,
    PrincipledSettlementComponent,
    GuestsComponent,
    EditGuestComponent,
    AnticipatedLitigationComponent,
    DashboardOrganizationsComponent,
    DialogCreateOrgComponent,
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
    EffectsModule.forRoot([
      AuthEffects,
      CasesEffects,
      UserEffects,
      CategoryEffects,
      DisputesEffects,
      OrganizationEffects,
      ScenarioEffects,
      CsvEffects,
      PermissionEffects
    ]),
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    DashboardGuardService,
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
    ScenarioService,
    OrganizationService,
    CsvService,
    PermissionService
  ],
  entryComponents: [
    DialogCreateCaseComponent,
    DialogCreateOrgComponent
  ],
  bootstrap: [AppComponent]
})
/**
 * Application root module
 */
export class AppModule { }
