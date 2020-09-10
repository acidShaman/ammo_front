import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {DatePipe} from '@angular/common';
import {ErrorStateMatcher, MatNativeDateModule} from '@angular/material/core';


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
  providers: [UserService, DatePipe, MatNativeDateModule]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  genders: any[] = [
    {name: 'Не вказувати', value: 'not given'},
    {name: 'Чоловіча', value: 'male'},
    {name: 'Жіноча', value: 'female'},
  ];
  maxDate: Date = new Date();


  constructor(private userService: UserService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
      passwords: new FormGroup({
        password: new FormControl('',
          [Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)]),
        // Checks that a password has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces.
        repeat_password: new FormControl('', [Validators.required])
      }),
      profile: new FormGroup({
        first_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Zа-яА-Я]{1,30})$/)]),
        last_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Zа-яА-Я]{1,30})$/)]),
        phone: new FormControl('', [Validators.required, Validators.pattern(/^([+])(\d{1,12})$/)]),
        sex: new FormControl(''),
        birthday: new FormControl('')
      })
    });
  }

  registerUser(): void {
    this.userService.registerNewUser(this.registerForm.value).subscribe(
      response => console.log('Response', response),
      error => console.log('error', error)
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

  isBirthdayValid(): boolean {
    const value = this.registerForm.get('birthday').value;
    const date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const control = this.registerForm.controls.birthday;
    return (value > date);
  }

  onSubmit(): void {
    this.registerUser();
  }
}
