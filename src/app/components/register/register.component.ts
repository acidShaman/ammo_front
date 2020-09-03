import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  genders: any[] = [
    {name: 'Не вказувати', value: 'not given'},
    {name: 'Чоловіча', value: 'male'},
    {name: 'Жіноча', value: 'female'},
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
      password: new FormControl('',
        [Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)]),
      // Checks that a password has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces.
      first_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Zа-яА-Я]{1,30})$/)]),
      last_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Zа-яА-Я]{1,30})$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^([+])(\d{1,12})$/)]),
      sex : new FormControl(''),
      birthday : new FormControl('')
    });
  }

  registerUser(): void {
    console.log(this.registerForm.value);
    this.userService.registerNewUser(this.registerForm.value).subscribe(
      response => console.log('Response', response),
      error => console.log('error', error)
    );
  }

}
