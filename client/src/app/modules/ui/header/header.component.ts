import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  mode = new FormControl('over');
  menu: Object;
  menuNormal: Object;
  user: any;

  constructor(
    private dataService: DataService) { }

  ngOnInit() {
    this.menu = [
      {
        link: "",
        name: "Home"
      },
      {
        link: "about",
        name: "About"
      }
    ];
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
          link: "signup",
          name: "Sign Up"
        }
      ];
  }

  logout() {

  }
}
