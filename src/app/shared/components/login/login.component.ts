import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import {AuthService} from '../../services/user/auth.service';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {RegisterComponent} from '../register/register.component';
import {RecoveryPasswordComponent} from '../recovery-password/recovery-password.component';
import {SnackbarService} from '../../services/snackbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Input()
  disabled: boolean;

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<NavBarComponent>,
              private snackbarService: SnackbarService) {}


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]), // , Validators.email]),
      password: new FormControl('', [Validators.required]) // , Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)])
    });
  }

  login(form: FormGroup): void {
    this.loginForm.disable();
    this.authService.authUser(form.value).subscribe((value) => {
        console.log(value);
        this.dialogRef.close();
      });
    this.loginForm.enable();
  }

  signInWithGoogle(): void {
    this.authService.authUser(null, GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.authUser(null, FacebookLoginProvider.PROVIDER_ID);
  }

  openRegisterDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
      if (response === true) {
        this.snackbarService.openSuccessSnackBar('Вітаєме, ваш акаунт успішно зареєстровано, тепер ви можете зайти у свій кабінет!');
      }
    });
  }

  openLoginDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.height = '450px';
    dialogConfig.width = '400px';

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

  }

  signOut(): void {
    this.authService.logout();
  }

  onSubmit(): void {
    this.login(this.loginForm);
  }

  openRecoveryPwdDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '500px';
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(RecoveryPasswordComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
      this.openLoginDialog();
    }, (error) => {
      console.log(error);
    });
  }


}
