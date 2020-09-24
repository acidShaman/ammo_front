import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {MenuService} from './menu.service';
import {IMenuData} from '../../interfaces/menu.interface';
import {MenuComponent} from '../../components/menu/menu.component';

@Injectable({
  providedIn: 'root'
})
export class MenuResolverService implements Resolve<any>{

  constructor(private menuService: MenuService, private menuComponent: MenuComponent) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMenuData> | Promise<IMenuData> | IMenuData {
    return this.menuService.getMenu();
  }
}
