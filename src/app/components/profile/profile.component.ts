import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, DatePipe]
})
export class ProfileComponent implements OnInit {
  profile = false;
  addresses = false;
  favorites = false;
  history = false;

  updateForm: FormGroup;
  genders: any[] = [
    {name: 'Не вказувати', value: 'not given'},
    {name: 'Чоловіча', value: 'male'},
    {name: 'Жіноча', value: 'female'},
  ];


  constructor(private userService: UserService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
  }


  showProfile(): void {
    this.profile = true;
    this.addresses = false;
    this.favorites = false;
    this.history = false;
  }

  showAddresses(): void {
    this.profile = false;
    this.addresses = true;
    this.favorites = false;
    this.history = false;
  }
  showFavorites(): void {
    this.profile = false;
    this.addresses = false;
    this.favorites = true;
    this.history = false;
  }
  showHistory(): void {
    this.profile = false;
    this.addresses = false;
    this.favorites = false;
    this.history = true;
  }
}
