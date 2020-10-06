import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ICategoryData} from '../../interfaces/menu.interface';
import {Observable} from 'rxjs';
import {MenuService} from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class RollsResolverService implements Resolve<ICategoryData>{

  constructor(private menuService: MenuService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategoryData> | Promise<ICategoryData> | ICategoryData {
    return this.menuService.getRolls();
  }
}
