import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from 'src/app/services/customers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  maxDate = new Date();
  validateForm!: FormGroup;
  customer = {
    email: '',
    lastName: '',
    name: '',
    dob: '',
  };
  id = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomersService,
    private route: ActivatedRoute
  ) {}

  submitForm(): void {
    console.log('Updating');
    if (this.validateForm.valid) {
      this.customerService
        .updateUser({
          _id: this.id,
          firstName: this.validateForm.value.name.split(' ')[0],
          middleName: this.validateForm.value.name.split(' ')[1],
          lastName: this.validateForm.value.lastName,
          dob: this.validateForm.value.dob,
          email: this.validateForm.value.email,
        })
        .then((resp) => {
          console.log('user updated successfully ');
        })
        .catch((err) => {
          console.log('err: ', err.message);
        });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      lastName: [null, [Validators.required]],
      name: [null, [Validators.required]],
      dob: [null, [Validators.required]],
    });

    this.route.params.subscribe((params) => {
      console.log('params: ', JSON.stringify(params['id']));
      this.id = params['id'];
    });

    this.customerService.getUserById(this.id).then((resp) => {
      console.log('resp: ', JSON.stringify(resp));
      this.customer.name =
        resp.data['user']['firstName'] +
        (resp.data['user']['middleName']
          ? ' ' + resp.data['user']['middleName']
          : '');
      this.customer.email = resp.data['user']['email'];
      this.customer.lastName = resp.data['user']['lastName'];
      this.customer.dob = resp.data['user']['dob'];
    });
  }
}
