import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IDishData} from '../../../../interfaces/menu.interface';
import {OrderService} from '../../../../services/order/order.service';
import {SnackbarService} from '../../../../services/snackbar.service';

@Component({
  selector: 'app-about-dish',
  templateUrl: './about-dish.component.html',
  styleUrls: ['./about-dish.component.css']
})
export class AboutDishComponent implements OnInit {
  URL = 'http://localhost:8000';
  currDish: IDishData;

  constructor(@Inject(MAT_DIALOG_DATA) public dish: any, private orderService: OrderService, private snackbarService: SnackbarService) {
    this.currDish = dish.dish;
  }

  ngOnInit(): void {
    console.log('Current dish:', this.currDish);
  }

  addToCart(position: IDishData): void {
    this.orderService.add(position);
    this.snackbarService.openSuccessSnackBar(position.name + ' було додано до замовлення');
    console.log('Added', position.name);
    console.log(this.orderService.getOrderListFromLocalStorage());
  }

  isPromo(position: IDishData): boolean {
    return position.name.includes('Акція:');
  }



}
