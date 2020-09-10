import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = 'http://localhost:8000/';
  constructor(private httpClient: HttpClient) { }

  registerNewUser(userData): Observable<any> {
    return this.httpClient.post(`${this.URL}profile/register/`, userData);
  }

  // getUserByEmail(username): Subscription {
  //   return this.httpClient.get(`${this.URL}profile/`, username).subscribe(value => {
  //     localStorage.setItem('user', value);
  //   });
  // }
}
