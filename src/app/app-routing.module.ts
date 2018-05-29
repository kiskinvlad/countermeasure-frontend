import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/pages/login/login.component';
import { DashboardCaseComponent } from '@app/pages/dashboard-case/dashboard-case.component';
import { AuthGuardService } from '@app/shared/guard/auth-guard.service';
import { EditCategoriesComponent } from '@app/pages/edit-categories/edit-categories.component';
import { AddEditCategoryComponent } from '@app/pages/edit-categories/add-edit-category/add-edit-category.component';


const routes: Routes = [
  { path: '', component: DashboardCaseComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/categories', component: EditCategoriesComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/categories/:category_id/:type', component: AddEditCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'case/:case_id/categories/:type', component: AddEditCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
