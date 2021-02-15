import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './shared/layouts/main-layout/main-layout.component';
import {ProfileComponent} from './shared/components/account/profile/profile.component';
import {AuthGuard} from './shared/classes/auth.guard';
import {UserResolverService} from './shared/services/user/user-resolver.service';
import {MenuComponent} from './shared/components/menu/menu.component';
import {CategoriesResolverService} from './shared/services/menu/categories-resolver.service';
import {PositionsComponent} from './shared/components/menu/positions/positions.component';
import {CategoriesComponent} from './shared/components/menu/categories/categories.component';
import {MainPageComponent} from './shared/components/main-page/main-page.component';
import {AccountComponent} from './shared/components/account/account.component';
import {AddressComponent} from './shared/components/account/address/address.component';
import {FavoritesComponent} from './shared/components/account/favorites/favorites.component';
import {OrderHistoryComponent} from './shared/components/account/order-history/order-history.component';
import {ResetPasswordComponent} from './shared/components/reset-password/reset-password.component';
import {MainPageResolverService} from './shared/services/menu/main-page-resolver.service';
import {AdminComponent} from './shared/components/admin/admin.component';
import {AdminGuard} from './shared/classes/admin.guard';
import {AdminPositionsComponent} from './shared/components/admin/admin-positions/admin-positions.component';
import {AdminCategoriesComponent} from './shared/components/admin/admin-categories/admin-categories.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', component: MainPageComponent, resolve: {categories: MainPageResolverService, user: UserResolverService}},
      {path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
          {path: '', redirectTo: 'categories', pathMatch: 'full'},
          {path: 'categories', component: AdminCategoriesComponent, resolve: {categories: CategoriesResolverService}},
          {path: 'positions', component: AdminPositionsComponent},
        ]
      },
      {
        path: 'account', component: AccountComponent, canActivate: [AuthGuard], children: [
          {path: '', redirectTo: 'profile', pathMatch: 'full'},
          {path: 'profile', component: ProfileComponent, resolve: {user: UserResolverService}},
          {path: 'address', component: AddressComponent, resolve: {user: UserResolverService}},
          {path: 'favorites', component: FavoritesComponent, resolve: {user: UserResolverService}},
          {path: 'order-history', component: OrderHistoryComponent, resolve: {user: UserResolverService}}
        ]
      },
      {
        path: 'menu', component: MenuComponent, children: [
          {path: '', component: CategoriesComponent, resolve: {categories: CategoriesResolverService, user: UserResolverService}},
          {path: ':category', component: PositionsComponent, resolve: { user: UserResolverService}}
        ]
      }
    ],
  },
  {path: 'password_reset/:reset_token', component: ResetPasswordComponent},
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
