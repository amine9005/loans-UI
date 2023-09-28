import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from 'src/app/services/customers.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  submitForm(): void {
    // console.log('Updating: ', this.validateForm.valid);
    // console.log('values: ', JSON.stringify(this.validateForm.value));
    // console.log('name: ', this.validateForm.value.name);
    // console.log('lastName: ', this.validateForm.value.lastName);
    // console.log('dob: ', this.validateForm.value.dob);
    // console.log('email: ', this.validateForm.value.email);

    if (this.validateForm.valid) {
      this.customerService
        .updateUser({
          _id: this.id,
          firstName: this.validateForm.value.name.split(' ')[0],
          middleName: this.validateForm.value.name.split(' ')[1]
            ? this.validateForm.value.name.split(' ')[1]
            : '',
          lastName: this.validateForm.value.lastName,
          dob: this.validateForm.value.dob,
          email: this.validateForm.value.email,
        })
        .then((resp) => {
          // console.log('user updated successfully ');
          this.router.navigate(['customers']);
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
      // console.log('params: ', JSON.stringify(params['id']));
      this.id = params['id'];
    });

    this.customerService.getUserById(this.id).then((resp) => {
      // console.log('resp: ', JSON.stringify(resp));
      this.customer.name =
        resp.data['user']['firstName'] +
        (resp.data['user']['middleName']
          ? ' ' + resp.data['user']['middleName']
          : '');
      this.validateForm.value.name = this.customer.name;
      this.customer.email = resp.data['user']['email'];
      this.validateForm.value.email = this.customer.email;
      this.customer.lastName = resp.data['user']['lastName'];
      this.validateForm.value.lastName = this.customer.lastName;
      this.customer.dob = resp.data['user']['dob'];
      this.validateForm.value.dob = this.customer.dob;
    });
  }
}
