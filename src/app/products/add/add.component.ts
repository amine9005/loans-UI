import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface ProductImage {
  id: number;
  path: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  validateForm!: FormGroup;
  invalid = false;
  imagesArray: Array<ProductImage> = [
    {
      id: 0,
      path: '',
    },
  ];
  imagesCount = 1;

  submitForm(): void {
    this.invalid = false;
    console.log('images array: ', JSON.stringify(this.imagesArray));
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
    if (this.imagesArray.length < 10) {
      this.imagesArray.push({ id: this.imagesCount - 1, path: '' });
      this.imagesCount += 1;
    }
  }

  setFilePath(value: string, id: number): void {
    this.imagesArray.forEach((image) => {
      console.log(`setFilePath`);
    });
  }

  removeImage(): void {
    if (this.imagesArray.length > 1) {
      this.imagesArray.pop();
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
