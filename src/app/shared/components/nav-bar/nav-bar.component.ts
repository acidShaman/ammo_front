import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {AuthService} from '../../services/user/auth.service';
import {Router} from '@angular/router';
import {SnackbarService} from '../../services/snackbar.service';
import {ModalService} from '../../services/modal/modal.service';
import {MatSelectChange} from '@angular/material/select';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: []
})
export class NavBarComponent implements OnInit {
  public currentCity: string;
  public availableCities = [{name: 'Львів', value: 'Lviv'}, {name: 'Нетішин', value: 'Netishyn'}];

  constructor(public authService: AuthService,
              private router: Router,
              private snackbarService: SnackbarService,
              private modal: ModalService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.currentCity = this.getCityFromLocalStorage()?.replace(/"/g, '');
    console.log(this.currentCity);
    if (this.currentCity === null || this.currentCity === undefined) {
      this.openCitySelectDialog();
    }
  }

  openLoginDialog(): void {
    this.modal.openLoginComponent();
  }


  changeCity($event: MatSelectChange): void {
    this.currentCity = $event.value;
    localStorage.setItem('currentCity', JSON.stringify(this.currentCity));
  }

  saveCityToLocalStorage(): void {
    localStorage.setItem('currentCity', JSON.stringify(this.currentCity));
  }

  getCityFromLocalStorage(): string  {
    return localStorage.getItem('currentCity');
  }

  deleteCityFromLocalStorage(): void {
    localStorage.removeItem('currentCity');
  }


  openRegisterDialog(): void {
    this.modal.openRegisterComponent().subscribe( res => {
      if (res === true) {
        this.openLoginDialog();
      }
    });
  }

  openCitySelectDialog(): void {
    this.modal.openCitySelectComponent(this.availableCities).subscribe( city => {
      if (city !== null) {
        this.currentCity = city.value;
        this.saveCityToLocalStorage();
      } else {
        this.openCitySelectDialog();
      }
    });
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }


  isAdmin(): boolean {
    return this.userService?.isAdmin() || false;
  }
}
