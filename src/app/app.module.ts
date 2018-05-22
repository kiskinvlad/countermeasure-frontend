import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './core/services/AuthenticationService/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './shared/guard/auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpHelperService } from './core/http-helper.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ApiRoutingService } from './core/api-routing.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, HttpHelperService, LocalStorageService, ApiRoutingService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
