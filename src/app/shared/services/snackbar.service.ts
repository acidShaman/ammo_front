import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone) {
  }


  public openSuccessSnackBar(message, action = 'ok', duration = 5000): void{
    this.snackBar.open(message, 'OK', {
      duration,
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
  }

  public openFailureSnackBar(message, action = 'ok', duration = 5000): void{
    this.snackBar.open(message, 'Спробуйте ще раз', {
      duration,
      panelClass: ['red-snackbar', 'login-snackbar'],
    });
  }
}

