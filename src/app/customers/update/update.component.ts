import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent {
  maxDate = new Date();
  validateForm!: FormGroup;

  submitForm(): void {
    console.log('Updating');
  }
}
