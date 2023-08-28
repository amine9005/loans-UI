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
  slagValue = '';

  updateSlag(event: any): void {
    this.slagValue = event.target.value;
  }

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
      this.imagesArray.push({ id: this.imagesCount, path: '' });
      this.imagesCount += 1;
    }
  }

  setFilePath(event: any, id: number): void {
    this.imagesArray.forEach((image) => {
      if (id == image.id) {
        image.path = event.target.value;
      }
    });
  }

  removeImage(): void {
    if (this.imagesArray.length > 1) {
      this.imagesArray.pop();
    }
  }

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      featured: [null, [Validators.required]],
      description: [null, [Validators.required]],
      short_description: [null, [Validators.required]],
      thumbnail: [null, [Validators.required]],
    });
  }
}
