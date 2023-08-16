import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  validateForm!: FormGroup;
  invalid = false;
  imagesCount = 1;

  submitForm(): void {
    this.invalid = false;
    if (this.validateForm.valid) {
      this.invalid = false;
      this.router.navigate(['products']);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  increaseImagesCount(): void {
    if (this.imagesCount < 10) {
      this.imagesCount += 1;
    }
  }

  removeImage(): void {
    if (this.imagesCount > 0) {
      this.imagesCount -= 1;
    }
  }

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
    });
  }
}
