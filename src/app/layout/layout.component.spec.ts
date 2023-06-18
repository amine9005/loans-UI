import { LayoutComponent } from './layout.component';
import { Router } from '@angular/router';

describe('LayoutComponent', () => {
  let fixture: LayoutComponent;
  let router: Router;

  beforeEach(() => {
    fixture = new LayoutComponent(router);
  });
  it('should be created', () => {
    expect(fixture).toBeDefined();
  });
});
