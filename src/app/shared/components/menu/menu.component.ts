import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../services/menu/menu.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ICategories} from '../../interfaces/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isRoot: boolean;
  route: string;
  routes = [
    {category: 'rolls', name: 'Роли'},
    {category: 'hot-rolls', name: 'Гарячі роли'},
    {category: 'sets', name: 'Сети'},
    {category: 'bowls', name: 'Боули'},
    {category: 'breakfasts', name: 'Сніданки'},
    {category: 'drinks', name: 'Напої'},
    {category: 'salads', name: 'Салати'},
    {category: 'special-offer', name: 'Акційні пропозиції'}
    ];
  categoryName: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.route = this.router.url.split('/')[2];
    for (const category of this.routes) {
      if (category.category === this.route) {
        this.categoryName = category.name;
      }
    }
    this.isRoot = this.router.url === '/menu';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.route = this.router.url.split('/')[2];
        for (const category of this.routes) {
          if (category.category === this.route) {
            this.categoryName = category.name;
          }
        }
        this.isRoot = this.router.url === '/menu';
      }
    });
  }

}
