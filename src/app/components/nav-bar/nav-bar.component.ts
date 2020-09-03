import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  Login: LoginComponent;
  Register: RegisterComponent;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  login(): void {
    this.dialog.open(LoginComponent);
  }

  register(): void {
    this.dialog.open(RegisterComponent);
  }

}
