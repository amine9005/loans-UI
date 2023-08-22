import { Injectable } from '@angular/core';
import httpCommon from '../utils/http-common';
import { Store } from '@ngrx/store';
import { userSate } from '../redux/auth/user.types';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private store: Store<{ user: userSate }>) {}

  getOrderss() {
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
}
