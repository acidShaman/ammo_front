import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../services/user/user.service';
import {Subscription} from 'rxjs';
import {MainLayoutComponent} from '../../layouts/main-layout/main-layout.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NavBarComponent} from '../nav-bar/nav-bar.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Input()
  disabled: boolean;
  subscription: Subscription;

  constructor(private userService: UserService, private dialog: MatDialog, private dialogRef: MatDialogRef<NavBarComponent>) {
  }



  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]), // , Validators.email]),
      password: new FormControl('', [Validators.required]) // , Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)])
    });
  }

  login(form: FormGroup): void {
    this.loginForm.disable();
    this.userService.authUser(form.value).subscribe( (value) => {
        console.log(value);
        this.userService.getUserInfoByToken(value.access);
        localStorage.setItem('access_token', value.access);
    },
      (error) => {
        console.log(error);
        this.loginForm.enable();
      });
  }

  onSubmit(): void {
    this.login(this.loginForm);
    this.dialogRef.close();
    console.log('Success');
  }


}
