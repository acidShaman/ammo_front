import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from '../services/user/auth.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {ResponseAccessToken} from '../interfaces/token.interface';
import {Router} from '@angular/router';
import {SnackbarService} from '../services/snackbar.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LoginComponent} from '../components/login/login.component';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router, private snackBar: SnackbarService, private dialog: MatDialog) {
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Handling token refreshing');
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: ResponseAccessToken) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access);
          console.log('New access token', token);
          return next.handle(this.addToken(request, this.authService.getAccessToken()));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(filter(token => token !== null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(token, this.authService.getAccessToken()));
        }));
    }
  }

  openLoginDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.height = '450px';
    dialogConfig.width = '400px';

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        console.log(response.data);
      }
    }, (error) => {
      console.log(error);
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      request = this.addToken(request, this.authService.getAccessToken());
    }

    // @ts-ignore
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string): any {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
