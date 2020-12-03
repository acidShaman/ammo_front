import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ICategoryData, IDishData} from '../../interfaces/menu.interface';
import {AuthService} from '../../services/user/auth.service';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faAngleDoubleRight, faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../services/user/user.service';
import {OrderService} from '../../services/order/order.service';
import {IUserData} from '../../interfaces/user.interface';
import {SnackbarService} from '../../services/snackbar.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CartComponent} from '../cart/cart.component';
import {AboutDishComponent} from '../menu/dish/about-dish/about-dish.component';
import {SwiperOptions} from 'swiper';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  menu: ICategoryData[];
  user: Partial<IUserData>;
  special: IDishData;
  HeartIcon = faHeart;
  HeartIconSolid = faHeartSolid;
  DoubleRightIcon = faAngleDoubleRight;
  URL = 'http://localhost:8000';
  swiperConfig: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 50,
    loop: false,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };
  constructor(private activatedRoute: ActivatedRoute, public authService: AuthService, private userService: UserService,
              private orderService: OrderService, private snackbarService: SnackbarService, private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.menu = this.activatedRoute.snapshot.data.categories;
    this.menu.forEach(category => {
      if (category.category === 'special-offer') {
        category.dishes.forEach(dish => {
          if (dish.name.includes('Акція:')) {
            this.special = dish;
          }
        });
      }
    });
    this.user = this.activatedRoute.snapshot.data.user;
    if (this.user !== null) {
      this.menu.forEach((category) => {
        category.dishes.forEach((dish) => {
          dish.favorite = Boolean(this.user.fav_dishes.find(favDish => favDish.id === dish.id));
        });
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

  goToCategory(category: ICategoryData): void {
    this.router.navigate(['menu', category.category]);
  }
}
