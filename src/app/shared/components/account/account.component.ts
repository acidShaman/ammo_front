import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Профіль',
        link: './profile',
        index: 0
      }, {
        label: 'Адреса доставки',
        link: './address',
        index: 1
      }, {
        label: 'Улюблене',
        link: './favorites',
        index: 2
      }, {
        label: 'Історія замовлень',
        link: './order-history',
        index: 3
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
