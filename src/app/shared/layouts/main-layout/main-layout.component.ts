import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CartComponent} from '../../components/cart/cart.component';
import {OrderService} from '../../services/order/order.service';
import {OrderItem} from '../../interfaces/order.interface';
import {ModalService} from '../../services/modal/modal.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MainLayoutComponent implements OnInit {
  shoppingBag = faShoppingBag;
  order: OrderItem[];
  // list
  constructor(public orderService: OrderService,
              private modal: ModalService) {
  }

  ngOnInit(): void {
    this.order = this.orderService.getOrderListFromLocalStorage();
    this.orderService.orderListUpdated.subscribe((orderList) => {
      console.log(orderList);
      this.order = orderList;
    });
  }


  openCartDialog(): void {
    this.modal.openCartComponent().subscribe(res => {
      if (res === true) {
        this.order = [];
        this.orderService.orderListUpdated.emit(this.order);
      }
    });
  }
}
