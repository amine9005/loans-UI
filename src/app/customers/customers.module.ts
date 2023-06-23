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

import { CustomersRoutingModule } from './customers-routing.module';
import { UpdateComponent } from './update/update.component';
import { ReadComponent } from './read/read.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    UpdateComponent,
    ReadComponent,
    ListComponent,
    DeleteComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
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
  ],
})
export class CustomersModule {}
