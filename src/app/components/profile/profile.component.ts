import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {DatePipe} from '@angular/common';
import {IUser} from '../../interfaces/user.interface';

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

  currentUser: IUser;

  updateForm: FormGroup;
  genders: any[] = [
    {name: 'Не вказувати', value: 'not given'},
    {name: 'Чоловіча', value: 'male'},
    {name: 'Жіноча', value: 'female'},
  ];


  constructor(private userService: UserService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      username: new FormControl('', ),
      first_name: new FormControl('', ),
      last_name: new FormControl('', ),
      phone: new FormControl('', ),
      sex: new FormControl('', ),
      birthday: new FormControl('', )
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.updateForm.controls[controlName];
    return control.invalid && control.touched;
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

  isBirthdayValid(): boolean {
    const value = this.updateForm.get('birthday').value;
    const date =  this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const control = this.updateForm.controls.birthday;
    return (value > date);
  }

  updateUser(): void {

  }
}
