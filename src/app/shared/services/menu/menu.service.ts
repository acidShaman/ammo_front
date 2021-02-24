import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICategories, ICategoryData, IDishData} from '../../interfaces/menu.interface';
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


  editCategory(categoryData: FormData, id): Observable<any> {
    return this.httpClient.patch<ICategoryData>(`/menu/category/${id}/edit/`, categoryData);
  }


  // tslint:disable-next-line:ban-types
  getCategory(category: String): Observable<ICategoryData> {
    return this.httpClient.get<ICategoryData>(`/menu/${category}`);
  }

  getFewDishesFromCategories(): Observable<ICategoryData[]> {
    return this.httpClient.get<ICategoryData[]>(`/menu/few/`);
  }

  getAllPositions(): Observable<IDishData[]> {
    return this.httpClient.get<IDishData[]>('/menu/all/');
  }
}
