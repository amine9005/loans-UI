import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import authService from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { loggedIn } from '../../redux/auth.actions';
import { userSate } from '../../redux/user.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  invalid = false;

  submitForm(): void {
    this.invalid = false;
    if (this.validateForm.valid) {
      authService
        .login(this.validateForm.value.email, this.validateForm.value.password)
        .then((resp) => {
          // console.log('resp: ' + resp);
          this.store.dispatch(
            loggedIn({ isLoggedIn: true, token: resp.data.accessToken })
          );
          this.invalid = false;
          this.router.navigate(['']);
        })
        .catch((err) => {
          console.log('error', err);
          this.invalid = true;
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<{
      user: userSate;
    }>
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      remember: [true],
    });
  }
}
