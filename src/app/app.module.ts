import {BrowserModule} from '@angular/platform-browser';
import {Router, RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMomentDateModule, MomentDateModule} from '@angular/material-moment-adapter';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_FORMATS, MatNativeDateModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';

import {AppComponent} from './shared/components/app/app.component';
import {RegisterComponent} from './shared/components/register/register.component';
import {LoginComponent} from './shared/components/login/login.component';
import {NavBarComponent} from './shared/components/nav-bar/nav-bar.component';
import {SideBarComponent} from './shared/components/side-bar/side-bar.component';
import {ProfileComponent} from './shared/components/account/profile/profile.component';
import {MY_DATE_FORMATS} from './directive/date-format/date-format';
import {TokenInterceptor} from './shared/classes/token.interceptor';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './shared/services/user/auth.service';
import { MenuComponent } from './shared/components/menu/menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { PositionsComponent } from './shared/components/menu/positions/positions.component';
import { CategoriesComponent } from './shared/components/menu/categories/categories.component';
import { CartComponent } from './shared/components/cart/cart.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AccountComponent } from './shared/components/account/account.component';
import { AddressComponent } from './shared/components/account/address/address.component';
import { FavoritesComponent } from './shared/components/account/favorites/favorites.component';
import { OrderHistoryComponent } from './shared/components/account/order-history/order-history.component';
import {MatSortModule} from '@angular/material/sort';
import {SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import { RecoveryPasswordComponent } from './shared/components/recovery-password/recovery-password.component';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavBarComponent,
    SideBarComponent,
    ProfileComponent,
    MainLayoutComponent,
    LoginComponent,
    MenuComponent,
    LoaderComponent,
    PositionsComponent,
    CategoriesComponent,
    CartComponent,
    MainPageComponent,
    FooterComponent,
    AccountComponent,
    AddressComponent,
    FavoritesComponent,
    OrderHistoryComponent,
    RecoveryPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    FontAwesomeModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MomentDateModule,
    MatTabsModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatIconModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [
    AuthService,
    CartComponent,
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '70926655559-buqdfnlrlvp4k9i8djhom3c71boa395m.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('389896282375476'),
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, RegisterComponent]
})
export class AppModule {
}
