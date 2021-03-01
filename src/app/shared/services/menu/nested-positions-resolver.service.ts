import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ICategories, IDishData} from '../../interfaces/menu.interface';
import {MenuService} from './menu.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NestedPositionsResolverService implements Resolve<IDishData[]>{

  constructor(private menuService: MenuService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDishData[]> | Promise<IDishData[]> | IDishData[] {
    return this.menuService.getAllPositions();
  }
}
