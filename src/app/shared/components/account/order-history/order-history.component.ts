import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {IUserData} from '../../../interfaces/user.interface';
import {OrderItemBackEnd} from '../../../interfaces/order.interface';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  user: Partial<IUserData>;
  displayedColumns: string[] = ['Номер замовлення', 'Дата і час замовлення', 'Позиції', 'Сума'];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.currentUser.getValue();
    this.sortData();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const dateStr =
      ('00' + date.getDate()).slice(-2) + '/' +
      ('00' + (date.getMonth() + 1)).slice(-2) + '/' +
      date.getFullYear() + ' ' +
      ('00' + date.getHours()).slice(-2) + ':' +
      ('00' + date.getMinutes()).slice(-2) + ':' +
      ('00' + date.getSeconds()).slice(-2);
    return dateStr;
  }

  calculatedPrice(orderItems: OrderItemBackEnd[]): number {
    let totalPrice = 0;
    for (const item of orderItems) {
      totalPrice += item.quantity * item.dish.price;
    }
    if (totalPrice < 200) {
      totalPrice += 50;
    }
    return totalPrice;
  }

  sortData($event?: Sort ): void {
    this.user.order_history = this.user.order_history.sort((a, b) => {
      return a.created < b.created ? 1 : -1;
    });
  }
}
