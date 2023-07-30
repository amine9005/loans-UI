import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
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
  async canActivate(): // next: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot
  Promise<boolean> {
    this.store.select('user').subscribe((data) => {
      this.isLoggedIn = data.isLoggedIn;
      // alert(JSON.stringify(UrlTree));

      // console.log('from guard isLoggedIn: ' + this.isLoggedIn);
    });

    if (!this.isLoggedIn) {
      await authService
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
