import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import authService from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { loggedIn } from '../../redux/auth.actions';
import { userSate } from '../../redux/user.types';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      authService
        .login(this.validateForm.value.email, this.validateForm.value.password)
        .then((resp) => {
          console.log('success', resp);
          this.store.dispatch(
            loggedIn({ isLoggedIn: true, token: resp.data.accessToken })
          );
        })
        .catch((err) => {
          console.log('error', err);
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
