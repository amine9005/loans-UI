import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    FormsModule,
    NzIconModule,
    ProductsRoutingModule,
  ],
})
export class ProductsModule {}
