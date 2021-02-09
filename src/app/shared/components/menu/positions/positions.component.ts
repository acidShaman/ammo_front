import {Component, OnInit, SimpleChanges} from '@angular/core';
import {ICategoryData, IDishArray, IDishData} from '../../../interfaces/menu.interface';
import {MenuService} from '../../../services/menu/menu.service';
import {ActivatedRoute, Router} from '@angular/router';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../../services/user/user.service';
import {IUserData} from '../../../interfaces/user.interface';
import {AuthService} from '../../../services/user/auth.service';
import {OrderService} from '../../../services/order/order.service';
import {SnackbarService} from '../../../services/snackbar.service';
import {filter, tap} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AboutDishComponent} from '../dish/about-dish/about-dish.component';

@Component({
  selector: 'app-category',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  HeartIcon = faHeart;
  HeartIconSolid = faHeartSolid;
  category: ICategoryData;
  favorites: IDishArray;
  loading = false;
  URL = 'http://localhost:8000';
  user: Partial<IUserData>;

  constructor(
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public authService: AuthService,
    private orderService: OrderService,
    private snackbarService: SnackbarService,
    private router: Router,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.orderService.setOrderList(this.orderService.getOrderListFromLocalStorage());
    this.loading = true;
    this.getDishes();
    this.user = this.activatedRoute.snapshot.data.user;


  }

  getDishes(): void {
    const dishesCategory = this.router.url.split('/')[2];
    this.menuService.getCategory(dishesCategory).pipe(
      filter( dishes => dishes !== null)
    ).subscribe(
      dishes => {
        this.category = dishes;
        this.setFavorites();
      }
    );
  }


  aboutDish(position: IDishData): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '900px';
    dialogConfig.height = '600px';
    dialogConfig.data = {
      dish: position
    };
    const dialogRef = this.dialog.open(AboutDishComponent, dialogConfig);

  }

  setFavorites(): void {
    if (this.user !== null) {
      this.category.dishes.forEach((dish: any) => {
        dish.favorite = Boolean(this.user.fav_dishes.find(favDish => favDish.id === dish.id));
      });
    }
  }

  toggleFavorite(dish): void {
    dish.favorite = !dish.favorite;
    if (!dish.favorite) {
      this.deleteFromFav(this.user.user.id, dish.id);
    } else {
      this.addToFav(this.user.user.id, dish.id);
    }
    console.log(dish);
  }

  deleteFromFav(userId, dishId): void {
    this.userService.deleteFavDish(userId, dishId).subscribe((response) => {
        this.snackbarService.openSuccessSnackBar('Блюдо було успішно видалено з обраного!');
        console.log(response);
      },
      (error) => {
        this.snackbarService.openFailureSnackBar('Сталася невідома помилка, спробуйте пізніше');
        console.log(error);
      });
    console.log('deleted!');
  }

  addToFav(userId, dishId): void {
    this.userService.addFavDish(userId, dishId).subscribe((response) => {
        console.log(response);
        this.snackbarService.openSuccessSnackBar('Блюдо було успішно додано до обраного!');
      },
      (error) => {
        console.log(error);
        this.snackbarService.openFailureSnackBar('Сталася невідома помилка, спробуйте пізніше');
      });
    console.log('Added to favorites!');
  }

  addToCart(position: IDishData): void {
    this.orderService.add(position);
    this.snackbarService.openSuccessSnackBar(position.name + ' було додано до замовлення');
    console.log('Added', position.name);
    console.log(this.orderService.getOrderListFromLocalStorage());
  }

}
