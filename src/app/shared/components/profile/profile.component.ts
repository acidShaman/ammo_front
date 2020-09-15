import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {DatePipe} from '@angular/common';
import {IUser, IUserData} from '../../interfaces/user.interface';
import {AuthService} from '../../services/user/auth.service';
import * as _moment from 'moment';
import { Moment } from 'moment';
import {MyErrorStateMatcher} from '../register/register.component';
const moment = _moment;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, DatePipe]
})
export class ProfileComponent implements OnInit {
  profile = false;
  addresses = false;
  favorites = false;
  history = false;
  matcher = new MyErrorStateMatcher();
  genders: any[] = [
    {name: 'Не вказувати', value: 'not given'},
    {name: 'Чоловіча', value: 'male'},
    {name: 'Жіноча', value: 'female'},
  ];
  maxDate: Moment;
  minDate = moment([1990, 1, 1]);

  user: Partial<IUserData>;
  token = this.authService.getAccessToken();
  currentUser = this.userService.currentUser;

  updateForm: FormGroup;



  constructor(private userService: UserService, private datePipe: DatePipe, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getInfo();
    this.maxDate = moment();
    this.updateForm = new FormGroup({
      username: new FormControl(this.user.user.username, ),
      first_name: new FormControl(this.user.user.first_name, ),
      last_name: new FormControl(this.user.user.last_name, ),
      phone: new FormControl(this.user.phone, ),
      sex: new FormControl(this.user.sex, ),
      birthday: new FormControl(this.user.birthday, )
    });
  }


  private getInfo(): void {
    this.userService.getUserInfoByToken(this.token)
      .subscribe(() => {
        if (this.currentUser.subscribe()) {
          this.currentUser.subscribe((user) => {
            this.user = user;
            console.log(this.user);
          });
        }
      });
  }


  showProfile(): void {
    this.profile = true;
    this.addresses = false;
    this.favorites = false;
    this.history = false;
  }

  showAddresses(): void {
    this.profile = false;
    this.addresses = true;
    this.favorites = false;
    this.history = false;
  }
  showFavorites(): void {
    this.profile = false;
    this.addresses = false;
    this.favorites = true;
    this.history = false;
  }
  showHistory(): void {
    this.profile = false;
    this.addresses = false;
    this.favorites = false;
    this.history = true;
  }

  isBirthdayValid(): boolean {
    const value = this.updateForm.get('birthday').value;
    const date =  this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const control = this.updateForm.controls.birthday;
    return (value > date);
  }

  updateUser(): void {
    console.log('lol');
  }

  onSubmit(): void {
    this.updateUser();
  }

}
