import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  URL = 'http://localhost:8000/';
  constructor(private httpClient: HttpClient) { }

  getMenu(): Observable<any> {
    return this.httpClient.get(`${this.URL}menu/`);
  }
}
