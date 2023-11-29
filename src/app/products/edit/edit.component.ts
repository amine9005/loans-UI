import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { response } from 'src/app/redux/products/products.types';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface ProductImage {
  id: number;
  path: string;
  file: any;
}

export interface Product {
  _id: string;
  name: string;
  thumbnail: string;
  pictures: Array<string>;
  slag: string;
  price: number;
  quantity: number;
  featured: boolean;
  description: string;
  short_description: string;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  validateForm!: FormGroup;
  invalid = false;
  imagesArray: Array<ProductImage> = [
    {
      id: 0,
      path: '/assets/images/cancel.png',
      file: null,
    },
  ];
  imagesCount = 1;
  slagValue = '';
  pictures: string[] = [];
  thumbnail = '/assets/images/cancel.png';
  thumbnailPath = '';
  product: Product = {
    _id: '',
    name: '',
    thumbnail: '',
    pictures: [],
    slag: '',
    price: 0,
    quantity: 0,
    featured: false,
    description: '',
    short_description: '',
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<{ products: response }>,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  updateSlag(event: any): void {
    this.slagValue = event.target.value;
  }

  updateThumbnail(event: any): void {
    if (event.target.files) {
      const reader = new FileReader();
      const file = event.target.files[0];
      const formData = new FormData();

      formData.append('picture', file);
      this.productsService
        .addPicture(formData)
        .then((resp) => {
          reader.readAsDataURL(file);
          reader.onload = (ev: any) => {
            this.thumbnail = ev.target.result;
            this.thumbnailPath = resp.data['path'];
          };
        })
        .catch((err) => {
          console.log('err: ', JSON.stringify(err));
        });
    }
  }

  submitForm(): void {
    this.imagesArray.forEach((image) => {
      this.pictures.push(image.file);
    });
    this.validateForm.value.thumbnail = this.thumbnailPath;
    this.validateForm.value.pictures = this.pictures;
    this.validateForm.value.slag = this.slagValue;

    if (!this.validateForm.value.name) {
      this.validateForm.value.name = this.product.name;
    }
    if (!this.validateForm.value.quantity) {
      this.validateForm.value.quantity = this.product.quantity;
    }
    if (!this.validateForm.value.price) {
      this.validateForm.value.price = this.product.price;
    }
    if (this.validateForm.value.featured === null) {
      this.validateForm.value.featured = this.product.featured;
    }
    if (!this.validateForm.value.description) {
      this.validateForm.value.description = this.product.description;
    }
    if (!this.validateForm.value.short_description) {
      this.validateForm.value.short_description =
        this.product.short_description;
    }
    console.log('product to be added: ', this.validateForm.value);
    console.log('valid: ', this.validateForm.valid);

    this.validateForm.updateValueAndValidity();

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
        console.log('control: ', control.invalid);
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
        file: null,
      });
      this.imagesCount += 1;
    }
  }

  setFilePath(event: any, id: number): void {
    this.imagesArray.forEach((image) => {
      if (id == image.id) {
        if (event.target.files) {
          const reader = new FileReader();
          const file = event.target.files[0];

          const formData = new FormData();
          formData.append('picture', file);

          this.productsService
            .addPicture(formData)
            .then((resp) => {
              reader.readAsDataURL(file);
              reader.onload = (ev: any) => {
                image.path = ev.target.result;
                image.file = resp.data['path'];
              };
            })
            .catch((err) => {
              console.log('unable to add image to list: ', err.message);
            });
        }
      }
    });
  }

  removeImage(): void {
    if (this.imagesArray.length > 1) {
      this.imagesArray.pop();
    }
  }

  async ngOnInit(): Promise<void> {
    let id = '';
    this.route.params.subscribe((params) => {
      console.log('params: ', JSON.stringify(params['id']));
      id = params['id'];
    });

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      featured: [null, [Validators.required]],
      description: [null, [Validators.required]],
      short_description: [null, [Validators.required]],
      thumbnail: [null, [Validators.required]],
      slag: [null, [Validators.required]],
      pictures: [null, [Validators.required]],
    });

    await this.productsService
      .getProductById(id)
      .then((resp) => {
        console.log('product: ', JSON.stringify(resp.data['product']));
        this.product = resp.data['product'];
        this.slagValue = this.product.slag;
        this.productsService
          .getImage(this.product.thumbnail.split('\\')[2])
          .then((resp) => {
            this.thumbnail = 'data:image/jpeg;base64,' + resp.data;
            this.thumbnailPath = this.product.thumbnail;
          })
          .catch((err) => {
            console.log('error: ', err.message);
          });
        this.imagesArray = [];
        for (let i = 0; i < this.product.pictures.length; i++) {
          const name = this.product.pictures[i].split('\\')[2];
          this.productsService
            .getImage(name)
            .then((resp) => {
              this.imagesArray.push({
                id: i,
                path: 'data:image/jpeg;base64,' + resp.data,
                file: this.product.pictures[i],
              });
            })
            .catch((err) => {
              console.log(
                'Unable to load image: ' + name + ' error: ',
                err.message
              );
            });
        }
      })
      .catch((err) => {
        console.log('error: ', err.message);
      });
  }
}
