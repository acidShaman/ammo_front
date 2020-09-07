import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private loginService: LoginService) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  login(form: FormGroup): void {
    this.loginService.auth(form.value).subscribe(( (value) => {
      localStorage.setItem('access_token', value.access);
    }));
  }
}
