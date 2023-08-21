import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { StoreModule } from '@ngrx/store';
import { userAuthReducer } from './redux/auth/auth.reducer';
import { customersReducer } from './redux/customers/customers.reducer';

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { productsReducer } from './redux/products/products.reducer';
import { ordersReducer } from './redux/orders/orders.reducer';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    UserAvatarComponent,
    FooterComponent,
    DashboardComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzGridModule,
    NzMenuModule,
    NzCollapseModule,
    NzIconModule,
    NzAvatarModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzTypographyModule,
    StoreModule.forRoot({
      user: userAuthReducer,
      customers: customersReducer,
      products: productsReducer,
      orders: ordersReducer,
    }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],

  bootstrap: [AppComponent],
})
export class AppModule {}
