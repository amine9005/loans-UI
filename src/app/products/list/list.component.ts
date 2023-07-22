import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { response } from 'src/app/redux/customers/customers.types';

interface Product {
  name: string;
  thumbnail: string;
  pictures: string;
  slag: string;
  price: string;
  quantity: string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  constructor(
    private store: Store<{
      customers: response;
    }>
  ) {}
  listOfData: Product[] = [];
}
