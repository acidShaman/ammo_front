import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserService} from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(private userService: UserService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>{
    if (this.userService.isAdmin()) {
      return of(true);
    } else {
      this.router.navigate(['']);
      return of(false);
    }

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>{
    return this.canActivate(route, state);
  }

}
