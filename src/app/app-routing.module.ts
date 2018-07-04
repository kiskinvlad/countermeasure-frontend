import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/pages/login/login.component';
import { DashboardCaseComponent } from '@app/pages/dashboard-case/dashboard-case.component';
import { EditDetailsComponent as MyProfileEditDetailsComponent } from '@app/pages/my-profile/edit-details/edit-details.component';
import { AuthGuardService } from '@app/shared/guard/auth-guard.service';
import { DashboardGuardService } from '@app/shared/guard/dashboard-guard.service';
import { EditCasesComponent } from '@app/pages/edit-cases/edit-cases.component';
import { EditCategoriesComponent } from '@app/pages/edit-categories/edit-categories.component';
import { AddEditCategoryComponent } from '@app/pages/edit-categories/add-edit-category/add-edit-category.component';
import { EditScenariosComponent } from '@app/pages/edit-scenarios/edit-scenarios.component';
import { MyProfileComponent } from '@app/pages/my-profile/my-profile.component';
import { ChangePasswordComponent } from '@app/pages/my-profile/change-password/change-password.component';
import { SummaryCategoriesComponent } from '@app/pages/summary-categories/summary-categories.component';
import { EditTaxesComponent } from '@app/pages/edit-taxes/edit-taxes.component';
import { AddEditTaxComponent } from '@app/pages/edit-taxes/add-edit-tax/add-edit-tax.component';
import { AddEditScenarioComponent } from '@app/pages/edit-scenarios/add-edit-scenario/add-edit-scenario.component';
import { OrganizationComponent } from '@app/pages/organization/organization.component';
import { EditDetailsComponent as OrgEditDetailsComponent } from '@app/pages/organization/edit-details/edit-details.component';
import { AmountInDisputeComponent } from '@app/pages/reports/amount-in-dispute/amount-in-dispute.component';
import { IssuesInDisputeComponent } from '@app/pages/reports/issues-in-dispute/issues-in-dispute.component';
import { SummaryScenariosComponent } from '@app/pages/summary-scenarios/summary-scenarios.component';
import { MembersComponent } from '@app/pages/organization/members/members.component';
import { SummaryTaxesComponent } from '@app/pages/summary-taxes/summary-taxes.component';
import { EditMemberComponent } from '@app/pages/organization/edit-member/edit-member.component';
import { GuestsComponent } from '@app/pages/organization/guests/guests.component';
import { EditGuestComponent } from '@app/pages/organization/edit-guest/edit-guest.component';
import { AnticipatedLitigationComponent } from '@app/pages/reports/anticipated-litigation/anticipated-litigation.component';
import { PrincipledSettlementComponent } from '@app/pages/reports/principled-settlement/principled-settlement.component';
import { DashboardOrganizationsComponent } from '@app/pages/dashboard-organizations/dashboard-organizations.component';
import { AddTaxesGuard } from '@app/shared/guard/add-taxes.guard';
/**
 * Application routes
 */
const routes: Routes = [
  { path: '', component: DashboardCaseComponent, canActivate: [DashboardGuardService] },
  { path: 'case/:case_id/categories', component: EditCategoriesComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/scenarios', component: EditScenariosComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/scenarios/:scenario_id/edit/:type', component: AddEditScenarioComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/scenarios/edit/:type', component: AddEditScenarioComponent,
    canActivate: [AuthGuardService],
    canDeactivate: [AuthGuardService]
  },
  { path: 'case/:case_id/scenarios/summary', component: SummaryScenariosComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/detail', component: EditCasesComponent, canActivate: [AuthGuardService]},
  { path: 'case/:case_id/categories/:category_id/edit/:type', component: AddEditCategoryComponent,
   canActivate: [AuthGuardService],
   canDeactivate: [AuthGuardService]
  },
  { path: 'case/:case_id/categories/edit/:type', component: AddEditCategoryComponent,
   canActivate: [AuthGuardService],
   canDeactivate: [AuthGuardService]
  },
  { path: 'case/:case_id/categories/summary', component: SummaryCategoriesComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/detail', component: EditCasesComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/taxes', component: EditTaxesComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/taxes/summary', component: SummaryTaxesComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/taxes/edit/:disputed_id', component: AddEditTaxComponent,
    canActivate: [AuthGuardService],
    canDeactivate: [AddTaxesGuard]
  },
  { path: 'case/:case_id/taxes/add', component: AddEditTaxComponent, canActivate: [AuthGuardService], canDeactivate: [AddTaxesGuard] },
  { path: 'case/:case_id/amount-in-dispute', component: AmountInDisputeComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/issues-in-dispute', component: IssuesInDisputeComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/anticipated-litigation', component: AnticipatedLitigationComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/principled-settlement', component: PrincipledSettlementComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'my-profile', component: MyProfileComponent,
    children: [
      { path: '', redirectTo: 'edit-details', pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'edit-details', component: MyProfileEditDetailsComponent, canActivate: [AuthGuardService] },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuardService] }
    ]
  },
  { path: 'organization/:org_id', component: OrganizationComponent,
    children: [
        { path: '', redirectTo: 'details', pathMatch: 'full', canActivate: [AuthGuardService] },
        { path: 'details', component: OrgEditDetailsComponent, canActivate: [AuthGuardService] },
        { path: 'members', component: MembersComponent, canActivate: [AuthGuardService] },
        { path: 'members/edit', component: EditMemberComponent, canActivate: [AuthGuardService] },
        { path: 'members/edit/:user_id', component: EditMemberComponent, canActivate: [AuthGuardService] },
        { path: 'guests', component: GuestsComponent, canActivate: [AuthGuardService] },
        { path: 'guests/edit', component: EditGuestComponent, canActivate: [AuthGuardService] },
        { path: 'guests/edit/:user_id', component: EditGuestComponent, canActivate: [AuthGuardService] },
    ]
  },
  { path: 'organizations', component: DashboardOrganizationsComponent, canActivate: [AuthGuardService] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
/**
 * Application routing module
 */
export class AppRoutingModule { }
