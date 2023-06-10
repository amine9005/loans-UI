import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    ResetComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzCheckboxModule,
  ],
})
export class AuthModule {}
