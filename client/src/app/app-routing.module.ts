import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './ui/layout/layout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

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
