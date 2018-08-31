import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
        return this.httpClient.get('/api/users/');
  }

  getById(id: number) {
      return this.httpClient.get('/api/users/' + id);
  }

  register(user: User) {
      return this.httpClient.post('/api/users/register', user);
  }

  login(username: string, password: string) {
      return this.httpClient.post('/api/users/login',
      {username: username, password: password});
  }

  update(user: User) {
      return this.httpClient.put('/api/users/' + user.id, user);
  }

  delete(id: number) {
      return this.httpClient.delete('/api/users/' + id);
  }

  auth() {
    return this.httpClient.get('/api/auth');
  }

  logout() {
    return this.httpClient.get('/api/logout');
  }
}
