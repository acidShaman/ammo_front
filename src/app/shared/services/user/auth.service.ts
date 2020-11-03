import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUser, IUserData} from '../../interfaces/user.interface';
import {Observable, throwError} from 'rxjs';
import {catchError, map, share, tap} from 'rxjs/operators';
import {ITokens, ResponseAccessToken} from '../../interfaces/token.interface';
import {UserService} from './user.service';
import {SnackbarService} from '../snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly access = 'access_token';
  private readonly refresh = 'refresh_token';
  private readonly URL = 'http://localhost:8000/';

  constructor(private httpClient: HttpClient, private userService: UserService, private snackbarService: SnackbarService) {
  }

  authUser(authInfo?: Partial<IUser>, providerId?: any): Observable<ITokens> {
    this.deleteTokens();
    this.userService.currentUser.next(null);
    if (authInfo !== null) {
      return this.httpClient.post<ITokens>(`${this.URL}token/`, authInfo).pipe(tap((response) => {
          const {access, refresh} = response;
          this.setTokens({access, refresh});
          this.userService.getUserInfoByToken(access).subscribe( (res: IUserData) => {
            this.snackbarService.openSuccessSnackBar(`Вітаю, ${res.user.first_name}, ви успішно залоговані!`);
          });
        }),
        catchError((err: any) => {
            this.snackbarService.openFailureSnackBar('Ви ввели неправильну пошту або пароль!');
            return throwError(err);
        })
      );
    }
  }



  logout(): void {
    this.deleteTokens();
    this.userService.currentUser.next(null);
    console.log('Logged out succesfully!');
  }

  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  refreshToken(): Observable<ITokens> {
    console.log('Refreshing token...');
    const refreshToken = this.getRefreshToken();
    return this.httpClient.post<ITokens>(`${this.URL}token/refresh/`, {refresh: refreshToken})
      .pipe(tap((response: ITokens) => {
        console.log('Response after refresh', response);
        this.setTokens(response);
      }, (err) => {
        this.snackbarService.openFailureSnackBar('Будь-ласка, перезайдіть у ваш кабінет!');
        this.logout();
      }));
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

  resetPasswordRequest(email: string): Observable<any> {
    return this.httpClient.post(`${this.URL}profile/password_reset/`, {email});
  }

  resetPasswordConfirm(newPwd, resetToken): Observable<any> {
    return this.httpClient.post(`${this.URL}profile/password_reset/confirm/`, {password: newPwd, token: resetToken});
  }

  newPassword(body): Observable<any> {
    return this.httpClient.post(`${this.URL}profile/new-password/`, body);
  }

}
