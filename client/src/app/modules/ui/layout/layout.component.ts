import { HeaderComponent } from './../header/header.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from 'src/app/animations/router.animation';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [routerTransition]
})
export class LayoutComponent implements OnInit {
  @ViewChild(HeaderComponent) header: HeaderComponent;
  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    if (this.header.sidenav.opened)
      this.header.sidenav.toggle();
  }

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }

}
