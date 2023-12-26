import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface OrderList {
  id: string;
  name: string;
  price: number;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  validateForm!: FormGroup;
  Products: Array<OrderList> = [];
  totalPrice = 0;
  selectedItems = ['here'];
  paymentMethods = ['PayPal', 'Visa', 'MasterCard', 'American Express'];
  invalid = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    let id = '';
    this.route.params.subscribe((params) => {
      console.log('params: ', JSON.stringify(params['id']));
      id = params['id'];
    });

    this.validateForm = this.fb.group({
      orderItems: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      province: [null, [Validators.required]],
      city: [null, [Validators.required]],
      paymentMethod: [null, [Validators.required]],
      shippingPrice: [null, [Validators.required]],
      totalPrice: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    console.log('submitting');
  }

  calculateTotalPrice(): void {
    // console.log('here');
    const items = this.validateForm.value.orderItems;
    this.totalPrice = 0;
    for (const item of items) {
      // const id = item.split('-')[0];
      const price = parseFloat(item.split('-')[1]);
      this.totalPrice += price;
    }
    // console.log('total price: ', this.totalPrice);
    this.validateForm.patchValue({
      totalPrice: this.totalPrice,
    });
  }
}
