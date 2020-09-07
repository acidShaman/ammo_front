import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../interfaces/user.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {IToken} from '../interfaces/token.interface';
import {Router, Route} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  URL = 'http://127.0.0.1:8000/token/';
  // private currentUserSubject: BehaviorSubject<IUser>;
  // public currentUser: Observable<IUser>;
  constructor(private  httpClient: HttpClient, private router: Router, private route: Route) { }

  auth(user: Partial<IUser>): Observable<IToken> {
    return this.httpClient.post<IToken>(`${this.URL}`, {username: user.username, password: user.password});
  }

}
