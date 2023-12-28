import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

interface OrderList {
  id: string;
  name: string;
  price: number;
}

interface Order {
  id: string;
  orderItems: Array<string>;
  paymentMethod: string;
  province: string;
  city: string;
  zipCode: number;
  shippingPrice: number;
  totalPrice: number;
  _v: number;
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
  currentOrder: Order = {
    id: '',
    orderItems: [],
    paymentMethod: '',
    province: '',
    city: '',
    zipCode: 0,
    shippingPrice: 0,
    totalPrice: 0,
    _v: 0,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private orderService: OrdersService
  ) {}

  async ngOnInit(): Promise<any> {
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

    await this.orderService
      .getOrderById(id)
      .then((resp) => {
        console.log('order obj: ', resp);
        const data = resp.data['order'][0];
        this.currentOrder._v = data['__v'];
        this.currentOrder.id = data['_id'];
        this.currentOrder.city = data['city'];
        this.currentOrder.shippingPrice = data['shippingPrice'];
        this.currentOrder.totalPrice = data['totalPrice'];
        this.currentOrder.province = data['shippingAddress'].split(',')[1];
        this.currentOrder.city = data['shippingAddress'].split(',')[0];
        this.currentOrder.zipCode = parseInt(
          data['shippingAddress'].split(',')[2]
        );
        this.currentOrder.paymentMethod = data['paymentMethod'];
        this.currentOrder.orderItems = data['orderItems'];

        this.validateForm = this.fb.group({
          orderItems: [null, [Validators.required]],
          zipCode: [null, [Validators.required]],
          province: [null, [Validators.required]],
          city: [null, [Validators.required]],
          paymentMethod: [
            this.currentOrder.paymentMethod,
            [Validators.required],
          ],
          shippingPrice: [null, [Validators.required]],
          totalPrice: [null, [Validators.required]],
        });
      })
      .catch((error) => {
        console.log('error: ', error.message);
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
