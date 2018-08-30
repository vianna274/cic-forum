import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu: Object;
  showMenu = false;

  constructor() { }

  ngOnInit() {
    this.menu = [
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
  }

}
