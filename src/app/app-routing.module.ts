import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './shared/layouts/main-layout/main-layout.component';
import {ProfileComponent} from './shared/components/profile/profile.component';
import {AuthGuard} from './shared/classes/auth.guard';
import {UserResolverService} from './shared/services/user/user-resolver.service';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: 'profile', component: ProfileComponent, resolve: {user: UserResolverService}, canActivate: [AuthGuard]},
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
