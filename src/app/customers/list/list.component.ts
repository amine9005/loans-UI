import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setCustomers } from 'src/app/redux/customers/customers.actions';
import { response } from 'src/app/redux/customers/customers.types';
import { CustomersService } from 'src/app/services/customers.service';

interface Person {
  key: string;
  firstName: string;
  lastName: string;
  dob: number;
  email: string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  selectBy = 'By Email';
  selections = ['By Email', 'By Name', 'By Id'];
  searchBy(value: string): void {
    // this.selectedCity = this.cityData[value][0];
  }

  constructor(
    private store: Store<{
      customers: response;
    }>,
    private customerService: CustomersService
  ) {}
  listOfData: Person[] = [];
  ngOnInit(): void {
    this.customerService
      .getUsers()
      .then((users) => {
        console.log('users: ' + JSON.stringify(users.data));
        this.store.dispatch(
          setCustomers({ isLoading: false, error: false, data: users.data })
        );
      })
      .catch((err) => {
        console.log('error: ' + err);
        this.store.dispatch(
          setCustomers({ isLoading: false, error: true, data: [] })
        );
      });
    this.store.select('customers').subscribe((data) => {
      this.listOfData = data.data['users'] as Person[];
    });
  }
}
