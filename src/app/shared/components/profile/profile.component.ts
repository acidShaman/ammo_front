import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {DatePipe} from '@angular/common';
import {IUser, IUserData} from '../../interfaces/user.interface';
import {AuthService} from '../../services/user/auth.service';
import * as _moment from 'moment';
import {Moment} from 'moment';
import {MyErrorStateMatcher} from '../register/register.component';
import {async} from 'rxjs/internal/scheduler/async';

const moment = _moment;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, DatePipe]
})
export class ProfileComponent implements OnInit {
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
    // this.updateForm = new FormGroup({
    //   username: new FormControl(this.user.user.username || ''),
    //   first_name: new FormControl(this.user.user.first_name, ),
    //   last_name: new FormControl(this.user.user.last_name, ),
    //   phone: new FormControl(this.user.phone, ),
    //   sex: new FormControl(this.user.sex, ),
    //   birthday: new FormControl(this.user.birthday, )
    // });
  }


  private getInfo(): void {
    this.userService.getUserInfoByToken(this.token)
      .subscribe(() => {
        if (this.currentUser.subscribe()) {
          this.currentUser.subscribe((user) => {
            this.user = user;
            console.log(this.user);
            this.initForm();
          });
        }
      });
  }

  private initForm(): void {
    this.updateForm = new FormGroup({
      username: new FormControl(this.user.user.username),
      // first_name: new FormControl(this.user.user.first_name, ),
      // last_name: new FormControl(this.user.user.last_name, ),
      // phone: new FormControl(this.user.phone, ),
      // sex: new FormControl(this.user.sex, ),
      // birthday: new FormControl(this.user.birthday, )
    });
  }

  updateUser(): void {
    console.log('lol');
  }
}
