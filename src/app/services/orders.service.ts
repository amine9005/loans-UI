import { Injectable } from '@angular/core';
import httpCommon from '../utils/http-common';
import { Store } from '@ngrx/store';
import { userSate } from '../redux/auth/user.types';
import { order } from '../redux/orders/orders.types';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private store: Store<{ user: userSate }>) {}

  getOrders() {
    let token = '';
    this.store.select('user').subscribe((data) => {
      token = data.token;
    });
    const config = {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    };
    return httpCommon.get('/orders', config);
  }

  addOrder(data: order) {
    let token = '';
    this.store.select('user').subscribe((data) => {
      token = data.token;
    });
    const config = {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    };
    return httpCommon.post('/orders', data, config);
  }

  updateOrder(id: string, data: order) {
    let token = '';
    this.store.select('user').subscribe((data) => {
      token = data.token;
    });
    const config = {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    };
    return httpCommon.put('/orders/update/' + id, data, config);
  }

  deleteOrder(id: string) {
    let token = '';
    this.store.select('user').subscribe((data) => {
      token = data.token;
    });
    const config = {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    };
    return httpCommon.delete('/orders/delete/' + id, config);
  }

  getOrderById(id: string) {
    let token = '';
    this.store.select('user').subscribe((data) => {
      token = data.token;
    });
    const config = {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    };
    return httpCommon.get('/orders/orders/' + id, config);
  }

  getOrderByTotalPrice(totalPrice: string) {
    let token = '';
    this.store.select('user').subscribe((data) => {
      token = data.token;
    });
    const config = {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    };
    return httpCommon.get('/orders/getByTotalPriceEqual/' + totalPrice, config);
  }
}
