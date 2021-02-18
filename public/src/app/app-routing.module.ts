import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MarketComponent } from './market/market.component';
import { ProfileComponent } from './profile/profile.component';
import { AddbikeComponent } from './addbike/addbike.component';
import { EditbikeComponent } from './editbike/editbike.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ViewbikeComponent } from './viewbike/viewbike.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'market', component: MarketComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'addbike', component: AddbikeComponent },
  { path: 'editbike/:id', component: EditbikeComponent },
  { path: 'viewbike/:id', component: ViewbikeComponent },
  { path: 'edituser', component: EdituserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
