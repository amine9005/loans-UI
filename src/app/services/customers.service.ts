import { Injectable } from '@angular/core';
import httpCommon from '../utils/http-common';
import { Store } from '@ngrx/store';
import { userSate } from '../redux/auth/user.types';
import { customer } from '../redux/customers/customers.types';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(
    private store: Store<{
      user: userSate;
    }>
  ) {}

  getUsers() {
    let token = '';
    this.store.select('user').subscribe((data) => {
      token = data.token;
    });
    const config = {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    };
    return httpCommon.get('/users', config);
  }

  getUserById(id: string) {
    let token = '';
    this.store.select('user').subscribe((data) => {
      token = data.token;
    });
    const config = {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log('searching for ', '/users/' + id);
    return httpCommon.get('/users/' + id, config);
  }

  updateUser(user: customer) {
    let token = '';
    this.store.select('user').subscribe((data) => {
      token = data.token;
    });
    const config = {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    };
    return httpCommon.put('/users/update/' + user._id, user, config);
  }

  getUserByEmail(email: string) {
    let token = '';
    this.store.select('user').subscribe((data) => {
      token = data.token;
    });
    const config = {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log('searching for ', '/users/emails/' + email);
    return httpCommon.get('/users/emails/' + email, config);
  }
}
