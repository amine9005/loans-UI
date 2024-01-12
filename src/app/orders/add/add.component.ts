import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { response } from 'src/app/redux/orders/orders.types';
import { OrdersService } from '../../services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

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
  invalid = false;
  orderStatus = ['Pending', 'Shipped', 'Delivered', 'Canceled'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<{ orders: response }>,
    private ordersService: OrdersService,
    private productsService: ProductsService
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      const items = this.validateForm.value.orderItems as Array<string>;
      for (let i = 0; i < items.length; i++) {
        // const id = item.split('-')[0];
        items[i] = items[i].split('-')[0];
      }
      this.validateForm.patchValue({
        orderItems: items,
        totalPrice: this.totalPrice,
      });
      (this.validateForm.value.shippingAddress =
        this.validateForm.value.city +
        ', ' +
        this.validateForm.value.province +
        ', ' +
        this.validateForm.value.zipCode),
        (this.invalid = false);

      this.validateForm.value.dateCreated = new Date();

      this.ordersService
        .addOrder(this.validateForm.value)
        .then((resp) => {
          this.router.navigate(['orders']);
        })
        .catch((err) => {
          console.log('Unable to add order: ', err.message);
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  calculateTotalPrice(): void {
    // console.log('here');
    const items = this.validateForm.value.orderItems;
    this.totalPrice = 0;
    for (const item of items) {
      // const id = item.split('-')[0];
      const price = parseFloat(item.split('-')[1]);
      this.totalPrice += price;
    }
    // console.log('total price: ', this.totalPrice);
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
      status: ['Pending', [Validators.required]],
      dateCreated: [null, [Validators.required]],
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
