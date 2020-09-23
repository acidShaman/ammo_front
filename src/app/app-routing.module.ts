import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './shared/layouts/main-layout/main-layout.component';
import {ProfileComponent} from './shared/components/profile/profile.component';
import {AuthGuard} from './shared/classes/auth.guard';
import {UserResolverService} from './shared/services/user/user-resolver.service';
import {MenuComponent} from './shared/components/menu/menu.component';
import {MenuResolverService} from './shared/services/menu/menu-resolver.service';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: 'profile', component: ProfileComponent, resolve: {user: UserResolverService}, canActivate: [AuthGuard]},
      {path: 'menu', component: MenuComponent, resolve: {menu: MenuResolverService}}
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
