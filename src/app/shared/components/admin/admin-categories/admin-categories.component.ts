import { Component, OnInit } from '@angular/core';
import {ICategoryData} from '../../../interfaces/menu.interface';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  public columns = ['id', 'image', 'name', 'category', 'isShown', 'edit'];
  public categories: ICategoryData[];
  URL = 'http://localhost:8000';


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories = this.activatedRoute.snapshot.data.categories;

    console.log(this.categories);
  }

}
