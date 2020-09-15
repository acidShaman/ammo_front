import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {DatePipe} from '@angular/common';
import {DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatDialogRef} from '@angular/material/dialog';
import * as _moment from 'moment';
import { Moment } from 'moment';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_DATE_FORMATS} from '../../../directive/date-format/date-format';
import {IUser} from '../../interfaces/user.interface';
import {Subscription} from 'rxjs';

const moment = _moment;


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = (form.control.hasError('notSame', 'passwords') && control.touched);
    return invalidCtrl;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    UserService, DatePipe, MatMomentDateModule,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  subscription: Subscription;
  matcher = new MyErrorStateMatcher();
  genders: any[] = [
    {name: 'Не вказувати', value: 'not given'},
    {name: 'Чоловіча', value: 'male'},
    {name: 'Жіноча', value: 'female'},
  ];
  maxDate: Moment;
  minDate = moment([1990, 1, 1]);

  constructor(private userService: UserService, private datePipe: DatePipe, private dialogRef: MatDialogRef<RegisterComponent>) {
  }

  ngOnInit(): void {
    this.maxDate = moment();
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
      passwords: new FormGroup({
        password: new FormControl('',
          [Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)]),
        repeat_password: new FormControl('', [Validators.required])
      }, this.passwordValidator),
        first_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Zа-яА-ЯЇїєЄІіЁё]{1,30})$/)]),
        last_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Zа-яА-ЯЇїєЄІіЁё]{1,30})$/)]),
        phone: new FormControl('', [Validators.required, Validators.pattern(/^([+])(\d{1,12})$/)]),
        sex: new FormControl(''),
        birthday: new FormControl(moment().format('YYYY-MM-DD'))
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  newCandidate(): void {
    const data: Partial<IUser> = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.passwords.password,
      first_name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name,
      phone: this.registerForm.value.phone,
      sex: this.registerForm.value.sex,
      birthday: this.registerForm.value.birthday
    };
    this.registerUser(data);
    console.log('Candidate created!!!');
  }

  registerUser(user: Partial<IUser>): void {
    this.registerForm.disable();
    this.subscription = this.userService.registerNewUser(user).subscribe(
      response => console.log('Response', response),
      error => {
        this.registerForm.enable();
        console.log('error', error);
      }
    );
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.controls[controlName];
    return control.invalid && control.touched;
  }

  passwordValidator(control: FormGroup): any {
    const pass = control.controls.password.value;
    const confirmPass = control.controls.repeat_password.value;
    // console.log(pass);
    // console.log(confirmPass);

    return pass === confirmPass ? null : {notSame: true};
  }

  onSubmit(): void {

    this.newCandidate();
    this.closeDialog();
    console.log('Success');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
