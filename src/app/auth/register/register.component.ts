import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import authService from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      authService
        .register(
          this.validateForm.value.name.split(' ')[0],
          this.validateForm.value.name.split(' ')[1],
          this.validateForm.value.lastName,
          this.validateForm.value.email,
          this.validateForm.value.dob,
          this.validateForm.value.password
        )
        .then((resp) => {
          console.log('success', resp);
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      lastName: [null, [Validators.required]],
      name: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  confirmationValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.value.password) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
