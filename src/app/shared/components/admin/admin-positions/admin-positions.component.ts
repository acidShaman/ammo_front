import { Component, OnInit } from '@angular/core';
import {ICategoryData, IDishData} from '../../../interfaces/menu.interface';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-admin-positions',
  templateUrl: './admin-positions.component.html',
  styleUrls: ['./admin-positions.component.css']
})
export class AdminPositionsComponent implements OnInit {
  public columns = ['id', 'category_name', 'name', 'price', 'image', 'weight', 'edit'];
  public categories: ICategoryData[];
  public positions: IDishData[] = [];
  URL = 'http://localhost:8000';
  selectedCategories: FormControl;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories = this.activatedRoute.snapshot.data.categories.filter( category => category.dishes.length >= 1);
    this.categories.forEach( category => {
      category.dishes.forEach( dish => {
        const candidate = dish;
        candidate.category_name = category.name;
        this.positions.push(candidate);
      });
    });
    this.selectedCategories = new FormControl(null);
  }


  positionsFromSelectedCategories(): IDishData[] {
    if (this.selectedCategories.value !== null && this.selectedCategories.value.length > 0) {
      const positions = [];
      this.positions.forEach( position => {
        if (this.selectedCategories.value.includes(position.category_name)) {
          positions.push(position);
        }
      });
      return positions;
    } else {
      return this.positions;
    }
  }

}
