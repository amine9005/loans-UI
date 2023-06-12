import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { userSate } from './redux/user.types';

describe('App Component', () => {
  let fixture: AppComponent;
  let store: Store<{
    user: userSate;
  }>;
  beforeEach(() => {
    fixture = new AppComponent(store);
  });

  test('should be created', () => {
    expect(fixture).toBeDefined();
  });
});
