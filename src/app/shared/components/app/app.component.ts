import { Component } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ammo-front';
  showLoadingScreen = true;

  constructor(private router: Router) {
    // @ts-ignore
    this.router.events.subscribe((routerEvent: Event) => {

      if (routerEvent instanceof NavigationStart) {
        this.showLoadingScreen = true;
      }

      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingScreen = false;
      }
      if (routerEvent instanceof NavigationError) {
        this.showLoadingScreen = false;
      }
      if (routerEvent instanceof NavigationCancel) {
        this.showLoadingScreen = false;
      }
    });
  }
}
