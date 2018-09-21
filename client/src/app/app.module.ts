import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UiModule } from './modules/ui/ui.module';
import { SharedModule } from './modules/shared/shared.module';
import { CustomMaterialModule } from './modules/custom-material/custom-material.module';
import { DataService } from 'src/app/services/data.service';
import { ForumModule } from './modules/forum/forum.module';
import { FriendsComponent } from './components/friends/friends.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MessagesComponent } from './components/messages/messages.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    FriendsComponent,
    FavoritesComponent,
    NotificationsComponent,
    MessagesComponent,
    CreatePostComponent,
  ],
  imports: [
    ForumModule,
    CustomMaterialModule,
    BrowserModule,
    HttpClientModule,
    UiModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    DataService,
    AuthGuardService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
