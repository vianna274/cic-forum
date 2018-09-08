import { HeaderComponent } from './../header/header.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
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

}
