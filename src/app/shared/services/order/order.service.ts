import {EventEmitter, Injectable, Input} from '@angular/core';
import {Order, OrderItem} from '../../interfaces/order.interface';
import {IDishData} from '../../interfaces/menu.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public orderListUpdated: EventEmitter<OrderItem[]> = new EventEmitter<OrderItem[]>();
  public orderList: OrderItem[] = [];
  public orderListTemplate: OrderItem[] = [{id: 2, name: 'extra_adds', price: 10, quantity: 0, image: null}];
  public price = 0;

  constructor(private httpClient: HttpClient) {
  }

  public setToLocalStorage(): void {
    console.log('Set order to localStorage');
    localStorage.setItem('notSubmittedOrder', JSON.stringify(this.orderList));
    this.computePrice();
  }

  public getOrderListFromLocalStorage(): OrderItem[] {
    const order = JSON.parse(localStorage.getItem('notSubmittedOrder'));
    if (order !== null && order !== []) {
      return order;
    } else {
      return this.orderListTemplate;
    }
  }

  public removeOrderFromLocalStorage(): void {
    localStorage.removeItem('notSubmittedOrder');
  }


  add(position: IDishData): void {
    if (this.orderList.length <= 1) {
      this.setOrderList(this.orderListTemplate);
    }
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
    this.orderListUpdated.emit(this.orderList);
    this.computePrice();
    this.setToLocalStorage();
  }

  remove(item: OrderItem): void {
    const index = this.orderList.findIndex(i => i.id === item.id);
    this.orderList.splice(index, 1);
    this.orderListUpdated.emit(this.orderList);
    this.computePrice();
  }

  increment(item: OrderItem): void {
    item.quantity += 1;

    this.orderListUpdated.emit(this.orderList);
    this.computePrice();
    console.log(this.orderList);
  }

  decrement(item: OrderItem): void {
    if (item.quantity >= 1) {
      item.quantity -= 1;
      this.orderListUpdated.emit(this.orderList);
      this.computePrice();
    }
  }

  public getOrderList(): OrderItem[] {
    return this.orderList;
  }

  public getOrderListTemplate(): OrderItem[] {
    return this.orderListTemplate;
  }

  public setOrderList(list): void {
    this.orderList = list;
    this.orderListUpdated.emit(this.orderList);
  }

  public getTotalPrice(): number {
    return this.price;
  }

  public submit(orderInfo): Observable<any> {
    const formData: FormData = new FormData();

    console.log('Order submitted', orderInfo);
    this.removeOrderFromLocalStorage();
    this.orderList = this.orderListTemplate;
    this.orderListUpdated.emit(this.orderList);


    for (const block of orderInfo) {
      if (!Array.isArray(block)) {
        const {...body} = block;
        const strings = Object.keys(body);
        strings.forEach(key => {
          if (body[key].value !== '') {
            formData.append(key, body[key].value);
          }
        });
      } else {
        formData.append('orderItems', JSON.stringify(block));
      }
    }
    return this.httpClient.post<any>(`/order/`, formData);
  }

  public computePrice(): void {
    this.price = this.orderList.reduce((total, item) => {
      if (item.quantity >= 1) {
        return total += item.quantity * item.price;
      } else {
        return total;
      }
    }, 0);
  }


}
