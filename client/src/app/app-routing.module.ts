import { ForumHomeComponent } from './modules/forum/forum-home/forum-home.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
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
      component: SignupComponent,
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
      component: SignupComponent
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
