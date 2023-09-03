import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { response } from 'src/app/redux/products/products.types';
import { ProductsService } from '../../services/products.service';

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
      path: '/assets/images/cancel.png',
    },
  ];
  imagesCount = 1;
  slagValue = '';
  pictures: string[] = [];
  thumbnail = '/assets/images/cancel.png';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<{ products: response }>,
    private productsService: ProductsService
  ) {}

  updateSlag(event: any): void {
    this.slagValue = event.target.value;
  }

  updateThumbnail(event: any): void {
    if (event.target.files) {
      const reader = new FileReader();
      // console.log('path: ' + JSON.stringify(event.target.files[0]));
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (ev: any) => {
        // console.log('path: ', ev.target.result);
        this.thumbnail = ev.target.result;
      };
    }
  }

  submitForm(): void {
    this.invalid = false;
    // console.log('images array: ', JSON.stringify(this.imagesArray));
    this.pictures.push(this.validateForm.value.thumbnail);
    for (let i = 0; i < this.imagesArray.length; i++) {
      this.pictures.push(this.imagesArray[i].path);
    }
    this.validateForm.value.pictures = this.pictures;
    this.validateForm.value.slag = this.slagValue;
    // console.log('product to be added: ', this.validateForm.value);

    if (this.validateForm.valid) {
      this.invalid = false;
      this.productsService
        .addProduct(this.validateForm.value)
        .then(() => {
          // console.log('products added successfully: ', this.validateForm.value);
          this.router.navigate(['products']);
        })
        .catch((error) => {
          console.log('error: ', error.message);
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

  increaseImagesCount(): void {
    if (this.imagesArray.length < 10) {
      this.imagesArray.push({
        id: this.imagesCount,
        path: '/assets/images/cancel.png',
      });
      this.imagesCount += 1;
    }
  }

  setFilePath(event: any, id: number): void {
    this.imagesArray.forEach((image) => {
      if (id == image.id) {
        if (event.target.files) {
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (ev: any) => {
            image.path = ev.target.result;
          };
        }
      }
    });
  }

  removeImage(): void {
    if (this.imagesArray.length > 1) {
      this.imagesArray.pop();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      featured: [false, [Validators.required]],
      description: [null, [Validators.required]],
      short_description: [null, [Validators.required]],
      thumbnail: [null, [Validators.required]],
    });
  }
}
