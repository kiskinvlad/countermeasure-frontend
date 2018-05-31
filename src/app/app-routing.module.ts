import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/pages/login/login.component';
import { DashboardCaseComponent } from '@app/pages/dashboard-case/dashboard-case.component';
import { AuthGuardService } from '@app/shared/guard/auth-guard.service';
import { EditCasesComponent } from '@app/pages/edit-cases/edit-cases.component';
import { EditCategoriesComponent } from '@app/pages/edit-categories/edit-categories.component';

const routes: Routes = [
  { path: '', component: DashboardCaseComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/categories', component: EditCategoriesComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/detail', component: EditCasesComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
