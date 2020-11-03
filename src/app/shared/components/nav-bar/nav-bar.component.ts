import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {UserService} from '../../services/user/user.service';
import {AuthService} from '../../services/user/auth.service';
import {Router} from '@angular/router';
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {SnackbarService} from '../../services/snackbar.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: []
})
export class NavBarComponent implements OnInit {

  constructor(private dialog: MatDialog, public authService: AuthService, private router: Router, private snackbarService: SnackbarService) {
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


  openRegisterDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.openLoginDialog();
      }
    });
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
