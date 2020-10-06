import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {MenuService} from './menu.service';
import {ICategories} from '../../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolverService implements Resolve<ICategories>{

  constructor(private menuService: MenuService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategories> | Promise<ICategories> | ICategories {
    return this.menuService.getCategories();
  }
}
