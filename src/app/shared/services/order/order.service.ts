import {Injectable} from '@angular/core';
import {Order, OrderItem} from '../../interfaces/order.interface';
import {IDishData} from '../../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public orderList: OrderItem[] = [{id: 0, name: 'extra_adds', price: 10, quantity: 0, image: null}];
  public price = 0;

  constructor() {
  }

  // createOrder(): void {
  //   localStorage.setItem('order', 'hello world');
  // }
  // getOrder(): string {
  //   return localStorage.getItem('order');
  // }

  private setToLocalStorage(): void {
    localStorage.setItem('notSubmittedOrder', JSON.stringify(this.orderList));
  }

  private getFromLocalStorage(): any {
    if (Boolean(localStorage.getItem('notSubmittedOrder'))) {
      return JSON.parse(localStorage.getItem('notSubmittedOrder'));
    } else {
      return null;
    }
  }

  private removeFromLocalStorage(): void {
    localStorage.removeItem('notSubmittedOrder');
  }


  add(position: IDishData): void {
    const orderItem: OrderItem = Object.assign({}, position, {
      id: position.id,
      name: position.name,
      price: position.price,
      image: position.image,
      quantity: 1
    });

    const candidate = this.orderList.find(i => i.id === orderItem.id);

    if (candidate) {
      candidate.quantity += orderItem.quantity;
    } else {
      this.orderList.push(orderItem);
    }
    this.computePrice();
    console.log(this.orderList);
  }

  remove(item: OrderItem): void {
    const index = this.orderList.findIndex(i => i.id === item.id);
    this.orderList.splice(index, 1);
    this.computePrice();
  }

  increment(item: OrderItem): void {
    item.quantity += 1;
    this.computePrice();
  }

  decrement(item: OrderItem): void {
    if (item.quantity >= 1) {
      item.quantity -= 1;
      this.computePrice();
    }

  }

  public getOrderList(): OrderItem[] {
    if (this.getFromLocalStorage() !== null) {
      this.orderList = this.getFromLocalStorage();
    }
    return this.orderList;
  }

  public getTotalPrice(): number {
    return this.price;
  }

  public submit(): void {
    console.log('Order submitted');
    this.removeFromLocalStorage();
  }

  public computePrice(): void {
    this.price = this.orderList.reduce((total, item) => {
      if (item.quantity >= 1) {
        return total += item.quantity * item.price;
      } else {
        return total;
      }
    }, 0);
    this.setToLocalStorage();
  }


}
