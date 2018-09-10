import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { environment } from '../../environments/environment';

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

  register(user: User) {
      return this.httpClient.post(environment.API_URL + '/users/register', user);
  }

  getUser(username: string, password: string) {
    return this.httpClient.get(environment.API_URL + `/users?username=${username}&password=${password}`);
  }

  update(user: User) {
      return this.httpClient.put(environment.API_URL + '/users/' + user.id, user);
  }

  delete(id: number) {
      return this.httpClient.delete(environment.API_URL + '/users/' + id);
  }

}
