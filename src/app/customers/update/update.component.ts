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
    firstName: '',
    dob: '',
  };

  constructor(
    private fb: FormBuilder,
    private customerService: CustomersService,
    private route: ActivatedRoute
  ) {}

  submitForm(): void {
    console.log('Updating');
    if (this.validateForm.valid) {
      console.log('Validating');
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      lastName: [null, [Validators.required]],
      name: [null, [Validators.required]],
      dob: [null, [Validators.required]],
    });

    let id = '';
    this.route.params.subscribe((params) => {
      console.log('params: ', JSON.stringify(params['id']));
      id = params['id'];
    });

    this.customerService.getUserById(id).then((resp) => {
      console.log('resp: ', JSON.stringify(resp));
      this.customer.firstName = resp.data['user']['firstName'];
      this.customer.email = resp.data['user']['email'];
      this.customer.lastName = resp.data['user']['lastName'];
      this.customer.dob = resp.data['user']['dob'];
    });
  }
}
