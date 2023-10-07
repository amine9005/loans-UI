import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setOrders } from 'src/app/redux/orders/orders.actions';
import { response } from 'src/app/redux/orders/orders.types';
import { OrdersService } from 'src/app/services/orders.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  listOfData: Order[] = [];
  invalid = false;
  OrderItems: Array<OrderList> = [];
  totalPrice = 0;
  validateForm!: FormGroup;

  constructor(
    private store: Store<{ orders: response }>,
    private orderService: OrdersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.orderService
      .getOrders()
      .then((orders) => {
        this.store.dispatch(
          setOrders({
            isLoading: false,
            error: false,
            data: orders.data,
          })
        );
        console.log('orders: ', orders);
      })
      .catch((err) => {
        this.store.dispatch(
          setOrders({ isLoading: false, error: true, data: [] })
        );
        console.log('error: ', err.message);
      });

    this.store.select('orders').subscribe((data) => {
      if (data.data['orders']) {
        this.listOfData = data.data['orders'] as Order[];
      } else if (data.data['order']) {
        this.listOfData = data.data['order'] as Order[];
      }
    });

    this.validateForm = this.fb.group({
      totalPrice: [null, [Validators.required]],
    });
  }

  updateTotalPrice(): void {
    for (const obj of this.OrderItems) {
      this.totalPrice += obj.price;
    }
  }

  deleteOrder(id: string) {
    this.orderService
      .deleteOrder(id)
      .then((resp) => {
        console.log('order deleted successfully');
        this.ngOnInit();
      })
      .catch((err) => {
        console.log('error deleting order', err.message);
      });
  }
}
