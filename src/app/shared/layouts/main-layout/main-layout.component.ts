import { Component, OnInit } from '@angular/core';
import {NavigationEnd, NavigationStart, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isLoading: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.routerEvents();
  }

  private routerEvents(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }
        case event instanceof NavigationEnd: {
          this.isLoading = false;
          break;
        }
      }
    });
  }
}
