import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../../models/user';

import { DataService } from '../../data.service';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu: Object;
  menuNormal: Object;
  showMenu = false;
  user: any;

  constructor(
    private dataService: DataService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.auth();
    this.menu = [
      {
        link: "",
        name: "Home"
      },
      {
        link: "about",
        name: "About"
      }
    ]
    this.menuNormal = [
        {
          link: "",
          name: "Home"
        },
        {
          link: "about",
          name: "About"
        },
        {
          link: "login",
          name: "Login"
        },
        {
          link: "register",
          name: "Register"
        }
      ]
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.auth();
  }

  logout() {
    this.dataService.logout()
      .pipe(first())
      .subscribe(resp => {
        this.user = resp;
      },
      error => {
        this.alertService.error(error);
      });
  }

  auth() {
    this.dataService.auth()
      .pipe(first())
      .subscribe(resp => {
        this.user = resp;
        this.alertService.success(  this.user);
      },
      error => {
        this.alertService.error(error);
      });
  }
}
