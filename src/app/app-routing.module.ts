import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/pages/login/login.component';
import { DashboardCaseComponent } from '@app/pages/dashboard-case/dashboard-case.component';
import { EditDetailsComponent as MyProfileEditDetailsComponent } from '@app/pages/my-profile/edit-details/edit-details.component';
import { AuthGuardService } from '@app/shared/guard/auth-guard.service';
import { EditCategoriesComponent } from '@app/pages/edit-categories/edit-categories.component';


const routes: Routes = [
  { path: '', component: DashboardCaseComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/categories', component: EditCategoriesComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'my-profile',
    children: [
      { path: '', redirectTo: 'edit-details', pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'edit-details', component: MyProfileEditDetailsComponent, canActivate: [AuthGuardService] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
