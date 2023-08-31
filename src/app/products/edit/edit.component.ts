import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { response } from 'src/app/redux/products/products.types';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  product?: Product;

  constructor(
    private store: Store<{
      products: response;
    }>,
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productService
          .getProductById(params['id'])
          .then((data) => {
            console.log('Product: ', JSON.stringify(data.data['product']));
            this.product = data.data['product'];
          })
          .catch((error) => {
            console.log('error: ', JSON.stringify(error.message));
          });
      }
    });
  }
}
