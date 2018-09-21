import { FavoritesComponent } from './components/favorites/favorites.component';
import { FriendsComponent } from './components/friends/friends.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ForumHomeComponent } from './modules/forum/forum-home/forum-home.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

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
      path: 'create_post', 
      canActivate: [AuthGuardService],
      component: CreatePostComponent
    },
    {
      path: 'messages', 
      canActivate: [AuthGuardService],
      component: MessagesComponent
    },
    {
      path: 'notifications', 
      canActivate: [AuthGuardService],
      component: NotificationsComponent
    },
    {
      path: 'friends', 
      canActivate: [AuthGuardService],
      component: FriendsComponent
    },
    {
      path: 'favorites', 
      canActivate: [AuthGuardService],
      component: FavoritesComponent
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
