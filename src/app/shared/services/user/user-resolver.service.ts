import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IUserData} from '../../interfaces/user.interface';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<IUserData> {

  constructor(private userService: UserService, private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserData> | Promise<IUserData> | IUserData {
    return this.userService.getUserInfoByToken(this.authService.getAccessToken());
  }
}
