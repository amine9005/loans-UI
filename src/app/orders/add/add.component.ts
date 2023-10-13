import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { response } from 'src/app/redux/orders/orders.types';
import { OrdersService } from '../../services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

interface Order {
  _id: string;
  orderItems: Array<string>;
  shippingAddress: string;
  paymentMethod: string;
  itemsPrice: Array<number>;
  shippingPrice: number;
  totalPrice: number;
}

interface OrderList {
  id: string;
  name: string;
  price: number;
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  validateForm!: FormGroup;
  OrderItems: Array<OrderList> = [];
  totalPrice = 0;
  selectedItems = ['here'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<{ orders: response }>,
    private ordersService: OrdersService,
    private productsService: ProductsService
  ) {}

  submitForm(): void {
    console.log('submitForm');
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    console.log('here is the price');
    console.log('items: ', JSON.stringify(this.selectedItems));
    // for (const obj of this.OrderItems) {
    //   this.totalPrice += obj.price;
    // }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      orderItems: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      province: [null, [Validators.required]],
      city: [null, [Validators.required]],
      paymentMethod: [null, [Validators.required]],
      itemsPrice: [null, [Validators.required]],
      shippingPrice: [null, [Validators.required]],
      totalPrice: [null, [Validators.required]],
    });

    this.productsService
      .getProducts()
      .then((products) => {
        for (const prod of products.data['products']) {
          console.log('prod', JSON.stringify(prod));
          this.OrderItems.push({
            id: prod._id,
            name: prod.name,
            price: prod.price,
          });
        }
      })
      .catch((error) => {
        console.log('error: ' + error.message);
      });
  }
}
