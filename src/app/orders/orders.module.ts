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

import { OrdersRoutingModule } from './orders-routing.module';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [
    ListComponent,
    SearchComponent,
    EditComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzGridModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzFormModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
  ],
})
export class OrdersModule {}
