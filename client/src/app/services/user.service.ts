import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new BehaviorSubject<User>(null);
  constructor() { }

  insertUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  updateCurrentUser() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.user.next(user);
  }

  deleteCurrentUser() {
    this.user.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    return this.user.getValue();
  }
}
