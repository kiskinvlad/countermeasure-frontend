import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/pages/login/login.component';
import { DashboardCaseComponent } from '@app/pages/dashboard-case/dashboard-case.component';
import { EditDetailsComponent as MyProfileEditDetailsComponent } from '@app/pages/my-profile/edit-details/edit-details.component';
import { AuthGuardService } from '@app/shared/guard/auth-guard.service';
import { EditCasesComponent } from '@app/pages/edit-cases/edit-cases.component';
import { EditCategoriesComponent } from '@app/pages/edit-categories/edit-categories.component';
import { AddEditCategoryComponent } from '@app/pages/edit-categories/add-edit-category/add-edit-category.component';
import { EditScenariosComponent } from '@app/pages/edit-scenarios/edit-scenarios.component';
import { MyProfileComponent } from '@app/pages/my-profile/my-profile.component';
import { ChangePasswordComponent } from '@app/pages/my-profile/change-password/change-password.component';
import { SummaryCategoriesComponent } from '@app/pages/summary-categories/summary-categories.component';
import { EditTaxesComponent } from '@app/pages/edit-taxes/edit-taxes.component';
import { AddEditTaxComponent } from '@app/pages/edit-taxes/add-edit-tax/add-edit-tax.component';

const routes: Routes = [
  { path: '', component: DashboardCaseComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/categories', component: EditCategoriesComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/scenaries', component: EditScenariosComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/detail', component: EditCasesComponent, canActivate: [AuthGuardService]},
  { path: 'case/:case_id/categories/:category_id/edit/:type', component: AddEditCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/categories/edit/:type', component: AddEditCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/categories/summary', component: SummaryCategoriesComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/detail', component: EditCasesComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/taxes', component: EditTaxesComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'my-profile', component: MyProfileComponent,
    children: [
      { path: '', redirectTo: 'edit-details', pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'edit-details', component: MyProfileEditDetailsComponent, canActivate: [AuthGuardService] },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuardService] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
