import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {AuthService} from '../../services/user/auth.service';
import {Router} from '@angular/router';
import {SnackbarService} from '../../services/snackbar.service';
import {ModalService} from '../../services/modal/modal.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: []
})
export class NavBarComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router,
              private snackbarService: SnackbarService,
              private modal: ModalService) {
  }

  openLoginDialog(): void {
    this.modal.openLoginComponent();
  }


  openRegisterDialog(): void {
    this.modal.openRegisterComponent().subscribe( res => {
      if (res === true) {
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
