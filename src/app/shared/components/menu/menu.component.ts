import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../services/menu/menu.service';
import {ActivatedRoute} from '@angular/router';
import {IMenuData} from '../../interfaces/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: IMenuData;
  menuSubtitles = [
    'Тицяй тут - їж удома ;)',
    'Вони ще смачніші, спробуй! ;)',
    'Довго не думай, мі підібрали за тебе :)',
    'Аммо це  тільки суші, а ще й',
    'Ранкова сила, хмм, най буде на цілий день!',
    'Можливо, бажаеш ще напій?',
  ];
  loading = false;
  constructor(private menuService: MenuService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.loading = true;
    this.menu = this.activatedRoute.snapshot.data.menu;
    console.log(this.menu);
  }

}
