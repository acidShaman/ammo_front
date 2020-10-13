import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {Order, OrderItem} from '../../interfaces/order.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public orderList: OrderItem[];
  public orderForm: FormGroup;
  public userForm: FormGroup;
  public addressForm: FormGroup;
  public paymentForm: FormGroup;
  public commentaryForm: FormGroup;
  URL = 'http://localhost:8000';

  constructor(public orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderList = this.orderService.getOrderList();
    // this.orderForm = new FormGroup({
    //   orderItems: new FormControl(this.orderList, [Validators.required])
    // });
    this.userForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Zа-яА-ЯЇїєЄІіЁё'-]{1,30})$/)]),
      last_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Zа-яА-ЯЇїєЄІіЁё'-]{1,30})$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^([+])(\d{8,14})$/)]),
    });
    this.addressForm = new FormGroup({
      street: new FormControl('', [Validators.required, Validators.pattern(/^([0-9a-zA-Zа-яА-ЯЇїєЄІіЁё,. -'ʼ"]{3,50})$/)]),
      number: new FormControl('', [Validators.required, Validators.pattern(/^([0-9a-zA-ZА-Яа-я,. -'ʼ"]{1,6})$/)]),
      entrance: new FormControl('', [Validators.pattern(/^([0-9a-zA-ZА-Яа-я -]{0,10})$/)]),
      housing: new FormControl('', [Validators.pattern(/^([0-9a-zA-ZА-Яа-я -]{0,5})$/)]),
      door: new FormControl('', [Validators.pattern(/^([0-9a-zA-ZА-Яа-я -]{0,7})$/)]),
      floor: new FormControl('', [Validators.pattern(/^([0-9 -]{0,10})$/)])
    });
    this.paymentForm = new FormGroup({
      payment_method: new FormControl('', [Validators.required]),
      promo_code: new FormControl('', [Validators.pattern(/^([a-zA-Z0-9 ]{1,20})$/)]),
    });
    this.commentaryForm = new FormGroup({
      commentary: new FormControl('', ),
      training_ch: new FormControl(1, [Validators.pattern(/^([0-9]{1,5})$/)]),
      normal_ch: new FormControl(1, [Validators.pattern(/^([0-9]{1,5})$/)]),
      extra_adds: new FormControl(0, [Validators.pattern(/^([0-9]{1,5})$/)])
    });
  }

  computePrice(): void {
    this.orderService.computePrice();
  }

  decrementQuantity(item: OrderItem): void {
    this.orderService.decrement(item);
  }

  incrementQuantity(item: OrderItem): void {
    this.orderService.increment(item);
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
  }

  isExtras(object): boolean {
    return object.id === 0;
  }

  submitOrder(): void {
    this.orderService.submit();
  }

}
