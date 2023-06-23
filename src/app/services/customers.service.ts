import { Injectable } from '@angular/core';
import httpCommon from '../utils/http-common';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  getUsers() {
    return httpCommon.get('/users', { withCredentials: true });
  }
}
