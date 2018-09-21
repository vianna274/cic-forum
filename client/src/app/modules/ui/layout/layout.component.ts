import { HeaderComponent } from './../header/header.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from 'src/app/animations/router.animation';
import { speedDialFabAnimations } from 'src/app/animations/fab-button.animation';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [routerTransition, speedDialFabAnimations]
})
export class LayoutComponent implements OnInit {
  @ViewChild(HeaderComponent) header: HeaderComponent;
  fabButtons = [
    {
      icon: 'sms',
      link: 'messages'
    },
    {
      icon: 'notifications',
      link: 'notifications'
    },
    {
      icon: 'person_add',
      link: 'friends'
    },
    {
      icon: 'star',
      link: 'favorites'
    },
    {
      icon: 'add_box',
      link: 'create_post'
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';

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

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

}
