import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './shared/layouts/main-layout/main-layout.component';
import {ProfileComponent} from './shared/components/profile/profile.component';
import {AuthGuard} from './shared/classes/auth.guard';
import {UserResolverService} from './shared/services/user/user-resolver.service';
import {MenuComponent} from './shared/components/menu/menu.component';
import {CategoriesResolverService} from './shared/services/menu/categories-resolver.service';
import {PositionsComponent} from './shared/components/menu/positions/positions.component';
import {RollsResolverService} from './shared/services/menu/rolls-resolver.service';
import {AdditionalsResolverService} from './shared/services/menu/additionals-resolver.service';
import {HotrollsResolverService} from './shared/services/menu/hotrolls-resolver.service';
import {SetsResolverService} from './shared/services/menu/sets-resolver.service';
import {SaladsResolverService} from './shared/services/menu/salads-resolver.service';
import {DrinksResolverService} from './shared/services/menu/drinks-resolver.service';
import {BreakfastsResolverService} from './shared/services/menu/breakfasts-resolver.service';
import {BowlsResolverService} from './shared/services/menu/bowls-resolver.service';
import {CategoriesComponent} from './shared/components/menu/categories/categories.component';
import {MainPageComponent} from './shared/components/main-page/main-page.component';
import {LoaderComponent} from './shared/components/loader/loader.component';
// import {CategoryResolverService} from './shared/services/menu/positions-resolver.service';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', component: MainPageComponent},
      {path: 'profile', component: ProfileComponent, resolve: {user: UserResolverService}, canActivate: [AuthGuard]},
      {path: 'menu',  component: MenuComponent, children: [
          {path: '', component: CategoriesComponent, resolve: {categories: CategoriesResolverService, user: UserResolverService}},
          {path: 'rolls', component: PositionsComponent, resolve: {category: RollsResolverService, user: UserResolverService}},
          {path: 'hot-rolls', component: PositionsComponent, resolve: {category: HotrollsResolverService, user: UserResolverService}},
          {path: 'sets', component: PositionsComponent, resolve: {category: SetsResolverService, user: UserResolverService}},
          {path: 'salads', component: PositionsComponent, resolve: {category: SaladsResolverService, user: UserResolverService}},
          {path: 'drinks', component: PositionsComponent, resolve: {category: DrinksResolverService, user: UserResolverService}},
          {path: 'breakfasts', component: PositionsComponent, resolve: {category: BreakfastsResolverService, user: UserResolverService}},
          {path: 'bowls', component: PositionsComponent, resolve: {category: BowlsResolverService, user: UserResolverService}},
          // {path: 'additionals', component: PositionsComponent, resolve: {positions: AdditionalsResolverService}},
        ]
      }
    ]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
