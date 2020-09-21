import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {IUser, IUserData} from '../../interfaces/user.interface';
import {AbstractControl} from '@angular/forms';
import {ITokens} from '../../interfaces/token.interface';
import {catchError, tap} from 'rxjs/operators';
import {IAddress} from '../../interfaces/address.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = 'http://localhost:8000/';
  constructor(private httpClient: HttpClient) { }

  currentUser: BehaviorSubject<Partial<IUserData>> = new BehaviorSubject({});

  registerNewUser(userData: Partial<IUser>): Observable<any> {
    return this.httpClient.post(`${this.URL}profile/register/`, userData);
  }


  // authUser(user: Partial<IUser>): Observable<ITokens> {
  //   return this.httpClient.post<ITokens>(`${this.URL}token/`, {username: user.username, password: user.password});
  // }

  updateUser(id, user): Observable<IUser> {
    const formData: FormData = new FormData();
    const {...body} = user;

    const strings = Object.keys(body);
    strings.forEach(key => {
      formData.append(key, body[key]);
    });

    return this.httpClient.patch<IUser>(`${this.URL}profile` + `/${id}/`, formData);
  }

  updateAddress(userId, address): Observable<IAddress> {
    const formData: FormData = new FormData();
    const {...body} = address;

    const strings = Object.keys(body);
    strings.forEach(key => {
      formData.append(key, body[key]);
    });

    return this.httpClient.post<IAddress>(`${this.URL}profile/${userId}/address/`, formData);
  }

  getUserInfoByToken(accessToken: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.httpClient.get<IUserData>(`${this.URL}profile/`, options)
      .pipe(
        tap((response: IUserData) => {
          this.currentUser.next(response);
        }),
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  // getUserByEmail(username): Subscription {
  //   return this.httpClient.get(`${this.URL}profile/`, username).subscribe(value => {
  //     localStorage.setItem('user', value);
  //   });
  // }
}
