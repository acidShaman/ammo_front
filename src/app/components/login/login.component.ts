import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Input()
  disabled: boolean;

  constructor(private loginService: LoginService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)])
    });
  }

  ngOnInit(): void {
  }

  login(form: FormGroup): void {
    this.loginService.auth(form.value).subscribe(( (value) => {
      localStorage.setItem('access_token', value.access);
    }));
  }

  onSubmit(): void {
    this.login(this.loginForm);
  }
}
