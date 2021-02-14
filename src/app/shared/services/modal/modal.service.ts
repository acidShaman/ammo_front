import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LoginComponent} from '../../components/login/login.component';
import {RegisterComponent} from '../../components/register/register.component';
import {CartComponent} from '../../components/cart/cart.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openLoginComponent(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.height = '450px';
    dialogConfig.width = '400px';

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
  }


  openRegisterComponent(): Observable<boolean> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);

    return dialogRef.afterClosed();
  }


  openCartComponent(): Observable<boolean | null> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '750px';
    const dialogRef = this.dialog.open(CartComponent, dialogConfig);

    return dialogRef.afterClosed();
  }
}
