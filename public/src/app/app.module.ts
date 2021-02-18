import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MarketComponent } from './market/market.component';
import { ProfileComponent } from './profile/profile.component';
import { AddbikeComponent } from './addbike/addbike.component';
import { EditbikeComponent } from './editbike/editbike.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ViewbikeComponent } from './viewbike/viewbike.component';

import { UserService } from './services/user.service';
import { BicycleService } from './services/bicycle.service';
import { GuardService } from './services/guard.service';
import { ValidateService } from './services/validate.service';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    MarketComponent,
    ProfileComponent,
    AddbikeComponent,
    EditbikeComponent,
    EdituserComponent,
    ViewbikeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    UserService,
    BicycleService,
    GuardService,
    ValidateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
