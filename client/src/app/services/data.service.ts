import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Class } from '../models/class.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
        return this.httpClient.get(environment.API_URL + '/users/');
  }

  getById(id: number) {
      return this.httpClient.get(environment.API_URL + '/users/' + id);
  }

  registerUser(user: User) {
      return this.httpClient.post(environment.API_URL + '/users', user);
  }

  getUser(username: string, password: string) {
    return this.httpClient.get(environment.API_URL + `/users?username=${username}&password=${password}`);
  }

  updateUser(user: User) {
      return this.httpClient.put(environment.API_URL + '/users/' + user.id, user);
  }

  deleteUser(id: number) {
      return this.httpClient.delete(environment.API_URL + '/users/' + id);
  }

  getCategory(id: number) {
    return this.httpClient.get(environment.API_URL + `/categories?id=${id}`);
  }

  getCategories() {
    return this.httpClient.get(environment.API_URL + `/categories`);
  }

  getPosts(id: number) {
    return this.httpClient.get(environment.API_URL + `/posts?semester=${id}`);
  }
}
