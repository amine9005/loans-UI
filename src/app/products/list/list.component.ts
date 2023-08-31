import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { response } from 'src/app/redux/products/products.types';
import { ProductsService } from 'src/app/services/products.service';
import { setProducts } from 'src/app/redux/products/products.actions';

interface Product {
  _id: string;
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
export class ListComponent implements OnInit {
  constructor(
    private store: Store<{
      products: response;
    }>,
    private productService: ProductsService
  ) {}
  listOfData: Product[] = [];
  ngOnInit(): void {
    this.productService
      .getProducts()
      .then((products) => {
        this.store.dispatch(
          setProducts({ isLoading: false, error: false, data: products.data })
        );
      })
      .catch((err) => {
        console.log('error: ' + err);
        this.store.dispatch(
          setProducts({ isLoading: false, error: true, data: [] })
        );
      });
    this.store.select('products').subscribe((data) => {
      if (data.data['products']) {
        this.listOfData = data.data['products'] as Product[];
      }
    });
  }
}
