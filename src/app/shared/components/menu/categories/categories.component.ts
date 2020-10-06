import { Component, OnInit } from '@angular/core';
import {ICategories} from '../../../interfaces/menu.interface';
import {MenuService} from '../../../services/menu/menu.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: ICategories;
  loading = false;
  URL = 'http://localhost:8000';
  constructor(private menuService: MenuService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.loading = true;
    this.categories = this.activatedRoute.snapshot.data.categories;
    console.log(this.activatedRoute.snapshot.data);
    console.log(this.categories);
  }

}
