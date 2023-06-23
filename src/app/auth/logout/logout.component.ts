import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loggedOut } from '../../redux/auth/auth.actions';
import { userSate } from 'src/app/redux/auth/user.types';
import { Store } from '@ngrx/store';
import authService from 'src/app/services/auth.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<{
      user: userSate;
    }>
  ) {}

  ngOnInit(): void {
    authService
      .logout()
      .then(() => {
        this.store.dispatch(loggedOut());
        this.router.navigate(['auth/login']);
      })
      .catch((err) => {
        this.router.navigate(['']);
        console.log('logout err: ' + err);
      });
  }
}
