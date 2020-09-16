import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUser} from '../../interfaces/user.interface';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ITokens, ResponseTokens} from '../../interfaces/token.interface';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly access = 'access_token';
  private readonly refresh = 'refresh_token';

  URL = 'http://localhost:8000/';

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  // authUser(authInfo: Partial<IUser>): Observable<any> {
  //   return this.httpClient.post(`${this.URL}/token/`, authInfo).pipe(tap((response) => {
  //       const {access, refresh} = response.data;
  //     this.setTokens(response.data);
  //     this.userService.getUserInfoByToken(response.access);
  //   }),
  //     catchError((err: any) => {
  //       return throwError(err);
  //     })
  //     );
  // }
  //
  //
  //
  logout(): void {
    this.deleteTokens();
    console.log('Logged out succesfully!');
  }

  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  private setAccessToken(token: string): void {
    localStorage.setItem(this.access, token);
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.refresh, token);
  }


  public getAccessToken(): string {
    return localStorage.getItem(this.access);
  }

  public getRefreshToken(): string {
    return localStorage.getItem(this.refresh);
  }

  private deleteTokens(): void {
    localStorage.removeItem(this.access);
    localStorage.removeItem(this.refresh);
  }

  private setTokens(tokens: ITokens): void {
    this.setAccessToken(tokens.access);
    this.setRefreshToken(tokens.refresh);
  }

}
