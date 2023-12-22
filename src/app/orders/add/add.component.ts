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
  Products: Array<OrderList> = [];
  totalPrice = 0;
  selectedItems = ['here'];
  paymentMethods = ['PayPal', 'Visa', 'MasterCard', 'American Express'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<{ orders: response }>,
    private ordersService: OrdersService,
    private productsService: ProductsService
  ) {}

  submitForm(): void {
    console.log('submitForm');
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    console.log('here is the price');
    console.log('items: ', JSON.stringify(this.validateForm.value.orderItems));
    const items = this.validateForm.value.orderItems;
    this.totalPrice = 0;
    for (const item of items) {
      // const id = item.split('-')[0];
      const price = parseFloat(item.split('-')[1]);
      this.totalPrice += price;
    }
    console.log('total price: ', this.totalPrice);
    this.validateForm.patchValue({
      totalPrice: this.totalPrice,
    });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      orderItems: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      province: [null, [Validators.required]],
      city: [null, [Validators.required]],
      paymentMethod: [null, [Validators.required]],
      shippingPrice: [null, [Validators.required]],
      totalPrice: [null, [Validators.required]],
    });

    this.productsService
      .getProducts()
      .then((products) => {
        for (const prod of products.data['products']) {
          // console.log('prod', JSON.stringify(prod));
          this.Products.push({
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
