import { Store } from '@ngrx/store';
import { userSate } from '../../redux/user.types';
import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';

describe('LoginComponent', () => {
  let fixture: LoginComponent;
  let store: Store<{
    user: userSate;
  }>;
  let fb: FormBuilder;

  beforeEach(() => {
    fixture = new LoginComponent(fb, store);
  });

  it('should create', () => {
    expect(1).toBeTruthy();
  });
});
