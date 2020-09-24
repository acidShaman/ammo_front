import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMenuData} from '../../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  URL = 'http://localhost:8000/';
  constructor(private httpClient: HttpClient) { }

  getMenu(): Observable<IMenuData> {
    return this.httpClient.get<IMenuData>(`${this.URL}menu/`);
  }
}
