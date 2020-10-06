import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ICategoryData} from '../../interfaces/menu.interface';
import {MenuService} from './menu.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakfastsResolverService implements Resolve<ICategoryData> {

  constructor(private menuService: MenuService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategoryData> | Promise<ICategoryData> | ICategoryData {
    return this.menuService.getBreakfasts();
  }
}
