import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      phone: new FormControl(''),
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
