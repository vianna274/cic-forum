import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'details/:city', component: RegisterComponent},
    {path: 'add', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
