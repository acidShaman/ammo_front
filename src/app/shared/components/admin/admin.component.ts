import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Категорії',
        link: './categories',
        index: 0
      }, {
        label: 'Позиції',
        link: './positions',
        index: 1
      }
    ];
  }


  ngOnInit(): void {
  }

}
