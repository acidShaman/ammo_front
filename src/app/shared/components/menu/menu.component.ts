import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../services/menu/menu.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: any;
  constructor(private menuService: MenuService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.menu = this.activatedRoute.snapshot.menu;
    console.log(this.menu);
  }

}
