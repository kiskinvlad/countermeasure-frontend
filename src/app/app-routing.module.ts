import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/pages/login/login.component';
import { DashboardCaseComponent } from '@app/pages/dashboard-case/dashboard-case.component';
import { EditDetailsComponent as MyProfileEditDetailsComponent } from '@app/pages/my-profile/edit-details/edit-details.component';
import { AuthGuardService } from '@app/shared/guard/auth-guard.service';


const routes: Routes = [
  { path: '', component: DashboardCaseComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'my-profile',
    children: [
      { path: '', redirectTo: 'edit-details', pathMatch: 'full' },
      { path: 'edit-details', component: MyProfileEditDetailsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
