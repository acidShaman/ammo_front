import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ICategoryData, IDishData} from '../../interfaces/menu.interface';
import {AuthService} from '../../services/user/auth.service';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../services/user/user.service';
import {OrderService} from '../../services/order/order.service';
import {IUserData} from '../../interfaces/user.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  menu: ICategoryData[];
  user: Partial<IUserData>;
  HeartIcon = faHeart;
  HeartIconSolid = faHeartSolid;
  URL = 'http://localhost:8000';

  constructor(private activatedRoute: ActivatedRoute, public authService: AuthService, private userService: UserService,
              private orderService: OrderService) {}

  ngOnInit(): void {
    this.menu = this.activatedRoute.snapshot.data.categories;
    this.user = this.activatedRoute.snapshot.data.user;
    if (this.user !== null) {
      this.menu.forEach( (category ) => {
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
        console.log(response);
      },
      (error) => {
        console.log(error);
      });
    console.log('deleted!');
  }

  addToFav(userId, dishId): void {
    this.userService.addFavDish(userId, dishId).subscribe((response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      });
    console.log('Added to favorites!');
  }

  addToCart(position: IDishData): void {
    this.orderService.add(position);
    console.log('Added', position.name);
    console.log(this.orderService.getOrderListFromLocalStorage());
  }
}
