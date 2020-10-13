import { Component, OnInit } from '@angular/core';
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CartComponent} from '../../components/cart/cart.component';
import {OrderService} from '../../services/order/order.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  shoppingBag = faShoppingBag;

  constructor(private dialog: MatDialog, public orderService: OrderService) { }

  ngOnInit(): void {

  }

  openCartDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.hasBackdrop = true;

    const dialogRef = this.dialog.open(CartComponent, dialogConfig);
  }


}
