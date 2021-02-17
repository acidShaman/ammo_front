import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICategories, ICategoryData} from '../../interfaces/menu.interface';
import {Form} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<ICategories> {
    return this.httpClient.get<ICategories>(`/menu/`);
  }

  createCategory(categoryData: FormData): Observable<any> {
    return this.httpClient.post<ICategoryData>('/menu/category/new/', categoryData);
  }

  // tslint:disable-next-line:ban-types
  getCategory(category: String): Observable<ICategoryData> {
    return this.httpClient.get<ICategoryData>(`/menu/${category}`);
  }

  getFewDishesFromCategories(): Observable<ICategoryData[]> {
    return this.httpClient.get<ICategoryData[]>(`/menu/all/`);
  }

  getRolls(): Observable<ICategoryData> {
    return this.getCategory('rolls');
  }
  getHotRolls(): Observable<ICategoryData> {
    return this.getCategory('hot-rolls');
  }
  getBowls(): Observable<ICategoryData> {
    return this.getCategory('bowls');
  }
  getSalads(): Observable<ICategoryData> {
    return this.getCategory('salads');
  }
  getSets(): Observable<ICategoryData> {
    return this.getCategory('sets');
  }
  getBreakfasts(): Observable<ICategoryData> {
    return this.getCategory('breakfasts');
  }
  getDrinks(): Observable<ICategoryData> {
    return this.getCategory('drinks');
  }
  getAdditionals(): Observable<ICategoryData> {
    return this.getCategory('additionals');
  }
}
