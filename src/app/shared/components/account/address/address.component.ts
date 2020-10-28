import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IUserData} from '../../../interfaces/user.interface';
import {UserService} from '../../../services/user/user.service';
import {IAddressEdit} from '../../../interfaces/address.interface';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  user: Partial<IUserData>;
  addressForm: FormGroup;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.currentUser.getValue();
    this.initAddressForm();
  }

  private initAddressForm(): void {
    if (this.user.address[0]) {
      this.addressForm = new FormGroup({
        street: new FormControl(this.user.address[0].street, [Validators.required, Validators.pattern(/^([0-9a-zA-Zа-яА-ЯЇїєЄІіЁё',. -]{3,50})$/)]),
        // tslint:disable-next-line:max-line-length
        number: new FormControl(this.user.address[0].number, [Validators.required, Validators.pattern(/^([0-9a-zA-ZА-Яа-я]{1,6})$/)]),
        entrance: new FormControl(this.user.address[0].entrance, [Validators.pattern(/^([0-9a-zA-ZА-Яа-я]{0,10})$/)]),
        housing: new FormControl(this.user.address[0].housing, [Validators.pattern(/^([0-9a-zA-ZА-Яа-я]{0,5})$/)]),
        door: new FormControl(this.user.address[0].door, [Validators.pattern(/^([0-9a-zA-ZА-Яа-я]{0,7})$/)]),
        floor: new FormControl(this.user.address[0].floor, [Validators.pattern(/^([0-9]{0,10})$/)])
      });
    } else {
      this.addressForm = new FormGroup({
        street: new FormControl('', [Validators.required, Validators.pattern(/^([0-9a-zA-Zа-яА-ЯЇїєЄІіЁё'-,.]{3,50})$/)]),
        number: new FormControl('', [Validators.required, Validators.pattern(/^([0-9a-zA-ZА-Яа-я]{1,6})$/)]),
        entrance: new FormControl('', [Validators.pattern(/^([0-9a-zA-ZА-Яа-я]{0,10})$/)]),
        housing: new FormControl('', [Validators.pattern(/^([0-9a-zA-ZА-Яа-я]{0,5})$/)]),
        door: new FormControl('', [Validators.pattern(/^([0-9a-zA-ZА-Яа-я]{0,7})$/)]),
        floor: new FormControl('', [Validators.pattern(/^([0-9]{0,10})$/)])
      });
    }
  }


  editAddress(): void {
    const data: IAddressEdit = this.addressForm.value;
    const userId: number = this.user.user.id;
    const fields = Object.keys(data);
    fields.forEach(key => {
      if (!data[key]) {
        delete data[key];
      }
    });
    this.updateAddress(userId, data);
    console.log(this.addressForm.value);
  }


  private updateAddress(userId: number, data: IAddressEdit): void {
    this.userService.updateAddress(userId, data).subscribe((response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }
}
