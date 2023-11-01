import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setCustomers } from 'src/app/redux/customers/customers.actions';
import { response } from 'src/app/redux/customers/customers.types';
import { CustomersService } from 'src/app/services/customers.service';
import { customer } from '../../redux/customers/customers.types';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  selectBy = 'By Email';
  selections = ['By Email', 'By Name', 'By Id'];
  searchTerm = '';
  constructor(
    private store: Store<{
      customers: response;
    }>,
    private customerService: CustomersService
  ) {}

  searchBy(value: string): void {
    this.selectBy = value;
  }

  search() {
    console.log('Searching');

    if (this.selectBy === 'By Id') {
      this.customerService
        .getUserById(this.searchTerm)
        .then((user) => {
          console.log('User ' + JSON.stringify(user));
          this.store.dispatch(
            setCustomers({
              isLoading: false,
              error: false,
              data: user.data,
            })
          );
        })
        .catch((error) => {
          console.log('error ' + JSON.stringify(error));
          this.store.dispatch(
            setCustomers({ isLoading: false, error: false, data: [] })
          );
        });
      console.log('searching for: ' + this.searchTerm);
    } else if (this.selectBy === 'By Email') {
      this.customerService
        .getUserByEmail(this.searchTerm)
        .then((user) => {
          console.log('User ' + JSON.stringify(user));
          this.store.dispatch(
            setCustomers({
              isLoading: false,
              error: false,
              data: user.data,
            })
          );
        })
        .catch((error) => {
          console.log('error ' + JSON.stringify(error));
          this.store.dispatch(
            setCustomers({ isLoading: false, error: false, data: [] })
          );
        });
    } else if (this.selectBy === 'By Name') {
      this.customerService
        .getUserByName(this.searchTerm)
        .then((user) => {
          console.log('User ' + JSON.stringify(user));
          this.store.dispatch(
            setCustomers({
              isLoading: false,
              error: false,
              data: user.data,
            })
          );
        })
        .catch((error) => {
          console.log('error ' + JSON.stringify(error));
          this.store.dispatch(
            setCustomers({ isLoading: false, error: false, data: [] })
          );
        });
    }
  }
}
