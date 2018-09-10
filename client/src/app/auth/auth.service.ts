import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor() { }

  public isAuthenticated(): boolean {
    if (localStorage.getItem('currentUser'))
      return true;
    return false;
  }
}
