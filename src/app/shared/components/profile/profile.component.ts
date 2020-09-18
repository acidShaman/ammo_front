import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {DatePipe} from '@angular/common';
import {IUser, IUserData, IUserEdit} from '../../interfaces/user.interface';
import {AuthService} from '../../services/user/auth.service';
import * as _moment from 'moment';
import {Moment} from 'moment';
import {MyErrorStateMatcher} from '../register/register.component';
import {ActivatedRoute} from '@angular/router';

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
  minDate = moment([1900, 1, 1]);

  user: Partial<IUserData>;
  token = this.authService.getAccessToken();
  currentUser = this.userService.currentUser;

  updateForm: FormGroup;
  addressForm: FormGroup;
  private userBirthday: Array<string>;


  constructor(private userService: UserService,
              private datePipe: DatePipe,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;
    console.log(this.user);
    this.maxDate = moment();
    this.initProfileForm();
    this.initAddressForm();
  }


  private initProfileForm(): void {
    this.updateForm = new FormGroup({
      username: new FormControl(this.user.user.username, [Validators.email, Validators.minLength(4)]),
      first_name: new FormControl(this.user.user.first_name, [Validators.pattern(/^([a-zA-Zа-яА-ЯЇїєЄІіЁё'-]{1,30})$/)]),
      last_name: new FormControl(this.user.user.last_name, [Validators.pattern(/^([a-zA-Zа-яА-ЯЇїєЄІіЁё'-]{1,30})$/)]),
      phone: new FormControl(this.user.phone, [Validators.pattern(/^([+])(\d{8,14})$/)] ),
      sex: new FormControl(this.user.sex, ),
      birthday: new FormControl(moment(this.user.birthday).format('YYYY-MM-DD'))
    });
  }

  private initAddressForm(): void {
    this.addressForm = new FormGroup({
      street: new FormControl(this.user.user.addresses[0].street, [Validators.required, Validators.pattern(/^([0-9a-zA-Zа-яА-ЯЇїєЄІіЁё'-,.]{3,50})$/) ]),
      number: new FormControl(this.user.user.addresses[0].number, [Validators.required, Validators.pattern(/^([0-9]+\s*([a-zA-ZА-Яа-я]{,6}))$/)]),
      entrance: new FormControl(this.user.user.addresses[0].entrance, [Validators.pattern(/^([0-9]+\s*([a-zA-ZА-Яа-я]{,10}))$/)]),
      housing: new FormControl(this.user.user.addresses[0].housing, [Validators.pattern(/^([0-9]+\s*([a-zA-ZА-Яа-я]{,5}))$/)]),
      door: new FormControl(this.user.user.addresses[0].door, [Validators.pattern(/^([0-9]+\s*([a-zA-ZА-Яа-я]{,7}))$/)]),
      floor: new FormControl(this.user.user.addresses[0].floor, [Validators.pattern(/^([0-9]{,10})$/)])
    });
  }

  editUser(): void {
    const data: IUserEdit = this.updateForm.value;
    const id: number = this.user.user.id;
    const fields = Object.keys(data);
    fields.forEach(key => {
      if (!data[key]) {
        delete data[key];
      }
    });
    this.updateUser(id, data);
  }

  updateUser(id: number, user: IUserEdit): void {
    this.userService.updateUser(id, user).subscribe(() => {
        console.log('Редагування пройшло успішно', 'success');
      },
      () => console.log('Невдала спроба', ''));
  }

  editAddress(): void {
    console.log('lol');
  }


}
