import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
import {DatePipe, formatDate} from '@angular/common';
import {IUserData, IUserEdit} from '../../../interfaces/user.interface';
import {AuthService} from '../../../services/user/auth.service';
import {Moment} from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import * as _moment from 'moment';
import {SnackbarService} from '../../../services/snackbar.service';

const moment = _moment;


class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = (form.control.hasError('notSame', 'passwords') && control.touched);
    return invalidCtrl;
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, DatePipe]
})
export class ProfileComponent implements OnInit {
  URL = 'http://localhost:8000';
  matcher = new MyErrorStateMatcher();
  genders: any[] = [
    {name: 'Не вказувати', value: 'not given'},
    {name: 'Чоловіча', value: 'male'},
    {name: 'Жіноча', value: 'female'},
  ];
  maxDate: Moment;
  minDate = moment([1900, 1, 1]);
  user: Partial<IUserData>;
  updateForm: FormGroup;
  changePasswordForm: FormGroup;
  PasswordFormVisibility = false;


  constructor(private userService: UserService,
              private datePipe: DatePipe,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;
    this.userService.currentUser.next(this.user);
    console.log(this.user);
    this.maxDate = moment();
    this.initProfileForm();
    this.initChangePwdForm();
  }

  togglePasswordForm(): void {
    this.PasswordFormVisibility = !this.PasswordFormVisibility;
  }

  newPasswordValidator(control: FormGroup): any {
    console.log(control);
    const oldPas = control.controls.old_pwd.value;
    const newPas = control.controls.passwords.get('new_pwd').value;

    return oldPas === newPas ? {same: true} : null;
  }

  passwordValidator(control: FormGroup): any {
    const pass = control.controls.new_pwd.value;
    const confirmPass = control.controls.confirm_pwd.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  private initChangePwdForm(): void {
    this.changePasswordForm = new FormGroup({
      old_pwd: new FormControl('', [Validators.required]),
      passwords: new FormGroup({
        new_pwd: new FormControl('', [Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)]),
        confirm_pwd: new FormControl('', [Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)]),
      }, this.passwordValidator)
    }, this.newPasswordValidator);
  }

  private initProfileForm(): void {
    this.updateForm = new FormGroup({
      username: new FormControl(this.user.user.username, [Validators.email, Validators.minLength(4)]),
      first_name: new FormControl(this.user.user.first_name, [Validators.pattern(/^([a-zA-Zа-яА-ЯЇїєЄІіЁё'-]{1,30})$/)]),
      last_name: new FormControl(this.user.user.last_name, [Validators.pattern(/^([a-zA-Zа-яА-ЯЇїєЄІіЁё'-]{1,30})$/)]),
      phone: new FormControl(this.user.phone, [Validators.pattern(/^([+])(\d{8,14})$/)]),
      sex: new FormControl(this.user.sex),
      birthday: new FormControl('', [Validators.minLength(8)])
    });
  }


  editUser(): void {
    const data: IUserEdit = this.updateForm.value;
    const id: number = this.user.user.id;
    const fields = Object.keys(data);
    fields.forEach(key => {
      if (!data[key] || this.userService.currentUser.value[key] === data[key] || this.userService.currentUser.value.user[key] === data[key]) {
        delete data[key];
      }
    });
    console.log(data);
    this.updateUser(id, data);
  }

  private updateUser(id: number, user: IUserEdit): void {
    this.userService.updateUser(id, user).subscribe((response: any) => {
        console.log(response);
        if (response.status === 200) {
          this.userService.currentUser.next(response.data.user);
          this.initProfileForm();
          this.snackbarService.openSuccessSnackBar('Профіль успішно оновлений!');
        }
      },
      (error) => {
        if (error.error.message === 'Phone exists') {
          this.snackbarService.openFailureSnackBar('Користувач з таким телефоном вже зареєстрований!');
        } else if (error.error.message === 'Email exists') {
          this.snackbarService.openFailureSnackBar('Користувач з такою поштою вже зареєстрований!');
        }
        console.log('Невдала спроба', error);
      });
  }


  resetPassword(): void {
    const body = {
      old_pwd: this.changePasswordForm.controls.old_pwd.value,
      new_pwd: this.changePasswordForm.get('passwords.new_pwd').value,
    };
    this.authService.newPassword(body).subscribe((response) => {
      console.log(response);
    }, (err) => {
      console.log(err);
    });
    this.PasswordFormVisibility = false;
    this.initChangePwdForm();
  }
}
