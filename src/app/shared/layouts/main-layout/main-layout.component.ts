import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CartComponent} from '../../components/cart/cart.component';
import {OrderService} from '../../services/order/order.service';
import {OrderItem} from '../../interfaces/order.interface';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MainLayoutComponent implements OnInit {
  shoppingBag = faShoppingBag;
  @Input() order: OrderItem[];
  // list
  constructor(private dialog: MatDialog, public orderService: OrderService) {
  }

  ngOnInit(): void {
    this.order = this.orderService.getOrderListFromLocalStorage();
    this.orderService.orderListUpdated.subscribe((orderList) => {
      console.log(orderList);
      this.order = orderList;
    });
  }


  openCartDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '750px';
    const dialogRef = this.dialog.open(CartComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( data => {
      if (data === true) {
        this.order = [];
      }
    });
  }

}
