import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userSate } from './redux/user.types';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Inventory Manager';
  constructor(
    private store: Store<{
      user: userSate;
    }>
  ) {}
  isLoggedIn = false;

  ngOnInit() {
    this.store.select('user').subscribe((data) => {
      this.isLoggedIn = data.isLoggedIn;
      console.log('isLoggedIn: ' + this.isLoggedIn);
    });
  }
}
