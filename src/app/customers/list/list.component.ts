import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setCustomers } from 'src/app/redux/customers/customers.actions';
import { response } from 'src/app/redux/customers/customers.types';
import { CustomersService } from 'src/app/services/customers.service';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
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
      user: response;
    }>,
    private customerService: CustomersService
  ) {}

  ngOnInit(): void {
    this.customerService
      .getUsers()
      .then((users) => {
        console.log('users: ' + users);
        // this.store.dispatch(setCustomers())
      })
      .catch((err) => {
        console.log('error: ' + err);
      });
  }
  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
}
