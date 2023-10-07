import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { response } from 'src/app/redux/orders/orders.types';
import { OrdersService } from '../../services/orders.service';

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
  listOfOption: string[] = [];
  listOfSelectedValue = ['a10', 'c12'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<{ orders: response }>,
    private ordersService: OrdersService
  ) {}

  submitForm(): void {
    console.log('submitForm');
  }

  updateTotalPrice(): void {
    for (const obj of this.OrderItems) {
      this.totalPrice += obj.price;
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      orderItems: [null, [Validators.required]],
      shippingAddress: [null, [Validators.required]],
      paymentMethod: [false, [Validators.required]],
      itemsPrice: [null, [Validators.required]],
      shippingPrice: [null, [Validators.required]],
      totalPrice: [null, [Validators.required]],
    });

    const children: string[] = [];
    for (let i = 10; i < 36; i++) {
      children.push(`${i.toString(36)}${i}`);
    }
    this.listOfOption = children;
  }
}
