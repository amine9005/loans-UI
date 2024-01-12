import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setOrders } from 'src/app/redux/orders/orders.actions';
import { response } from 'src/app/redux/orders/orders.types';
import { OrdersService } from 'src/app/services/orders.service';

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
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  listOfData: Order[] = [];
  invalid = false;

  constructor(
    private store: Store<{ orders: response }>,
    private orderService: OrdersService
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
  }

  updateStatus(_id: string, event: any) {
    console.log('updating status: ', _id, event.target.value);
    this.orderService
      .getOrderById(_id)
      .then((resp) => {
        console.log('resp: ', resp.data['order'][0]);
        const order = resp.data['order'][0];
        order['status'] = event.target.value;
        console.log('order: ', order);
        this.orderService
          .updateOrder(_id, order)
          .then((resp) => {
            console.log('order updated successfully');
          })
          .catch((err) => {
            console.log('Unable to find and update product: ', err.message);
          });
      })
      .catch((err) => {
        console.log('Unable to find and update product: ', err.message);
      });
  }

  update() {
    console.log('Here here');
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
