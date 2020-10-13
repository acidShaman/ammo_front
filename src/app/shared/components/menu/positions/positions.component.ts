import {Component, OnInit, SimpleChanges} from '@angular/core';
import {ICategoryData, IDishArray, IDishData} from '../../../interfaces/menu.interface';
import {MenuService} from '../../../services/menu/menu.service';
import {ActivatedRoute} from '@angular/router';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../../services/user/user.service';
import {IUserData} from '../../../interfaces/user.interface';
import {AuthService} from '../../../services/user/auth.service';
import {OrderService} from '../../../services/order/order.service';

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
    private authService: AuthService,
    private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.user = this.activatedRoute.snapshot.data.user;
    this.category = this.activatedRoute.snapshot.data.category;
    this.category.dishes.forEach((dish: any) => {
      dish.favorite = Boolean(this.user.fav_dishes.find(favDish => favDish.id === dish.id ));
      console.log(dish);
    });
    // tslint:disable-next-line:prefer-for-of
    console.log(this.category.dishes);
    console.log(this.user);
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
  }

}
