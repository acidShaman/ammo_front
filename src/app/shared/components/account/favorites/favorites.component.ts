import {Component, OnInit} from '@angular/core';
import {IUserData} from '../../../interfaces/user.interface';
import {UserService} from '../../../services/user/user.service';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {IDishData} from '../../../interfaces/menu.interface';
import {OrderService} from '../../../services/order/order.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  user: Partial<IUserData>;
  HeartIcon = faHeart;
  HeartIconSolid = faHeartSolid;
  URL = 'http://localhost:8000';

  constructor(private userService: UserService, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.user = this.userService.currentUser.getValue();
    this.user.fav_dishes.forEach((dish) => {
      dish.favorite = true;
    });
  }

  deleteFromFav(userId, dishId): void {
    this.user.fav_dishes.forEach((value) => {
      if (value.id === dishId) {
        this.user.fav_dishes.splice(this.user.fav_dishes.indexOf(value), 1);
        console.log('Deleted dish with id', value.id, '!');
      }
    });
    this.userService.deleteFavDish(userId, dishId).subscribe((response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      });
    console.log('deleted!');
  }

  toggleFavorite(dish): void {
    dish.favorite = !dish.favorite;
    if (!dish.favorite) {
      this.deleteFromFav(this.user.user.id, dish.id);
    }
  }

  addToCart(position: IDishData): void {
    this.orderService.add(position);
    console.log('Added', position.name);
    console.log(this.orderService.getOrderListFromLocalStorage());
  }
}
