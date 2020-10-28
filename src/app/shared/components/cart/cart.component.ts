import {ChangeDetectionStrategy, Component, Inject, Input, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {OrderItem} from '../../interfaces/order.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../services/user/user.service';
import {IUserData} from '../../interfaces/user.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CartComponent implements OnInit {
  private currentUser: Partial<IUserData> = null;
  @Input() public orderList: OrderItem[];
  public totalPrice: number;
  public userForm: FormGroup;
  public addressForm: FormGroup;
  public paymentForm: FormGroup;
  public commentaryForm: FormGroup;
  URL = 'http://localhost:8000';

  constructor(public orderService: OrderService,
              private dialogRef: MatDialogRef<CartComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private userService: UserService) {
    this.orderList = data.order;
    console.log(this.orderList);
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(value => {
      this.currentUser = value;
    });
    this.orderService.orderListUpdated.subscribe((orderList) => {
      this.orderList = orderList;
      if (this.orderList.length === 1) {
        this.dialogRef.close(false);
      }
      console.log(this.orderList);
    });
    this.computePrice();
    this.initUserForm();
    this.initAddressForm();
    this.paymentForm = new FormGroup({
      payment_method: new FormControl('', [Validators.required]),
      promo_code: new FormControl('', [Validators.pattern(/^([a-zA-Z0-9., ]{1,20})$/)]),
    });
    this.commentaryForm = new FormGroup({
      commentary: new FormControl(''),
      training_ch: new FormControl(0, [Validators.pattern(/^([0-9]{1,5})$/)]),
      normal_ch: new FormControl(this.orderService.getOrderList().length - 1, [Validators.pattern(/^([0-9]{1,5})$/)]),
    });
  }

  initUserForm(): void {
    if (this.currentUser === null) {
      this.userForm = new FormGroup({
        first_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Zа-яА-ЯЇїєЄІіЁё'-]{1,30})$/)]),
        last_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Zа-яА-ЯЇїєЄІіЁё'-]{1,30})$/)]),
        phone: new FormControl('', [Validators.required, Validators.pattern(/^([+])(\d{8,14})$/)]),
      });
    } else {
      this.userForm = new FormGroup({
        first_name: new FormControl(this.currentUser.user.first_name, [Validators.required, Validators.pattern(/^([a-zA-Zа-яА-ЯЇїєЄІіЁё'-]{1,30})$/)]),
        last_name: new FormControl(this.currentUser.user.last_name, [Validators.required, Validators.pattern(/^([a-zA-Zа-яА-ЯЇїєЄІіЁё'-]{1,30})$/)]),
        phone: new FormControl(this.currentUser.phone, [Validators.required, Validators.pattern(/^([+])(\d{8,14})$/)]),
      });
    }
  }

  initAddressForm(): void {
    if (this.currentUser === null || this.currentUser.address[0] === undefined) {
      this.addressForm = new FormGroup({
        street: new FormControl('', [Validators.required, Validators.pattern(/^([0-9a-zA-Zа-яА-ЯЇїєЄІіЁё,. -'ʼ"]{3,50})$/)]),
        number: new FormControl('', [Validators.required, Validators.pattern(/^([0-9a-zA-ZА-Яа-я,. -'ʼ"]{1,6})$/)]),
        entrance: new FormControl('', [Validators.pattern(/^([0-9a-zA-ZА-Яа-я -]{0,10})$/)]),
        housing: new FormControl('', [Validators.pattern(/^([0-9a-zA-ZА-Яа-я -]{0,5})$/)]),
        door: new FormControl('', [Validators.pattern(/^([0-9a-zA-ZА-Яа-я -]{0,7})$/)]),
        floor: new FormControl('', [Validators.pattern(/^([0-9 -]{0,10})$/)])
      });
    } else {
      this.addressForm = new FormGroup({
        street: new FormControl(this.currentUser.address[0].street, [Validators.required, Validators.pattern(/^([0-9a-zA-Zа-яА-ЯЇїєЄІіЁё,. -'ʼ"]{3,50})$/)]),
        number: new FormControl(this.currentUser.address[0].number, [Validators.required, Validators.pattern(/^([0-9a-zA-ZА-Яа-я,. -'ʼ"]{1,6})$/)]),
        entrance: new FormControl(this.currentUser.address[0].entrance, [Validators.pattern(/^([0-9a-zA-ZА-Яа-я -]{0,10})$/)]),
        housing: new FormControl(this.currentUser.address[0].housing, [Validators.pattern(/^([0-9a-zA-ZА-Яа-я -]{0,5})$/)]),
        door: new FormControl(this.currentUser.address[0].door, [Validators.pattern(/^([0-9a-zA-ZА-Яа-я -]{0,7})$/)]),
        floor: new FormControl(this.currentUser.address[0].floor, [Validators.pattern(/^([0-9 -]{0,10})$/)])
      });
    }
  }


  computePrice(): void {
    this.orderService.computePrice();
  }

  decrementQuantity(item: OrderItem): void {
    console.log(item.name, 'decremented');
    this.orderService.decrement(item);
    this.orderService.setToLocalStorage();
  }

  incrementQuantity(item: OrderItem): void {
    console.log(item.name, 'incremented');
    this.orderService.increment(item);
    this.orderService.setToLocalStorage();
  }

  isMinimum(quantity: number): boolean {
    if (quantity <= 1) {
      return true;
    }
  }

  isMinimumSticks(quantity: number): boolean {
    if (quantity <= 0) {
      return true;
    }
  }

  incrementNormalSticks(form): void {
    form.controls.normal_ch.setValue(form.controls.normal_ch.value + 1);
  }

  decrementNormalSticks(form): void {
    form.controls.normal_ch.setValue(form.controls.normal_ch.value - 1);
  }

  incrementTrainingSticks(form): void {
    form.controls.training_ch.setValue(form.controls.training_ch.value + 1);
  }

  decrementTrainingSticks(form): void {
    form.controls.training_ch.setValue(form.controls.training_ch.value - 1);
  }

  incrementExtras(form): void {
    form.controls.extra_adds.setValue(form.controls.extra_adds.value + 1);
  }

  decrementExtras(form): void {
    form.controls.extra_adds.setValue(form.controls.extra_adds.value - 1);
  }

  removeItem(orderItem: OrderItem): void {
    this.orderService.remove(orderItem);
    this.orderService.setToLocalStorage();
  }

  isExtras(object): boolean {
    return object.id === 1;
  }

  submitOrder(orderInfo): void {
    this.orderList = this.orderService.getOrderListTemplate();
    this.orderService.submit(orderInfo).subscribe((response) => {
      console.log(response);
      this.dialogRef.close(true);
    }, (error) => {
      console.log(error);
      this.dialogRef.close(false);
    });
  }

  onExtrasChange(): void {
    this.orderService.setToLocalStorage();
    this.computePrice();
  }

}
