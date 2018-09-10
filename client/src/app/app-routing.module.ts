import { ForumHomeComponent } from './modules/forum/forum-home/forum-home.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    {
      path: '', 
      component: HomeComponent,
      data: { animation: 'home'}
    },
    {
      path: 'login', 
      component: LoginComponent,
      data: { animation: 'login'}
    },
    {
      path: 'signup', 
      component: RegisterComponent,
      canActivate: [AuthGuardService],
      data: { animation: 'signup'}
    },
    {
      path: 'categories', 
      component: ForumHomeComponent,
      canActivate: [AuthGuardService],
      data: { animation: 'categories'}
    },
    {
      path: 'add', 
      component: RegisterComponent
    },
    {
      path: '**',
      redirectTo: ''
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
