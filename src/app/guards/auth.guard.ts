import { Injectable } from '@angular/core';
import {
  // ActivatedRouteSnapshot,
  CanActivate,
  Router,
  // RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { userSate } from '../redux/auth/user.types';
import authService from '../services/auth.service';
import { loggedIn } from '../redux/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<{
      user: userSate;
    }>,
    private router: Router
  ) {}
  isLoggedIn = false;
  canActivate(): // next: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot

  | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.store.select('user').subscribe((data) => {
      this.isLoggedIn = data.isLoggedIn;
      // console.log('from guard isLoggedIn: ' + this.isLoggedIn);
    });

    if (!this.isLoggedIn) {
      authService
        .refresh()
        .then((resp) => {
          // console.log('accessToken: ' + JSON.stringify(resp.data.accessToken));
          this.store.dispatch(
            loggedIn({ isLoggedIn: true, token: resp.data.accessToken })
          );
          this.isLoggedIn = true;
        })
        .catch((err) => {
          console.log('error: ' + err);
          this.isLoggedIn = false;

          this.router.navigate(['auth/login']);
        });
    }

    return this.isLoggedIn;
  }
}
