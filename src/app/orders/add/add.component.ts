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
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<{ orders: response }>,
    private ordersService: OrdersService
  ) {}

  submitForm(): void {
    console.log('submitForm');
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
  }
}
