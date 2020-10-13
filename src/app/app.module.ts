import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
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
import {ProfileComponent} from './shared/components/profile/profile.component';
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
    ],
  providers: [
    AuthService,
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, RegisterComponent]
})
export class AppModule {
}
