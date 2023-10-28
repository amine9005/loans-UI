import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Store } from '@ngrx/store';
import { setProducts } from 'src/app/redux/products/products.actions';
import { response } from 'src/app/redux/products/products.types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(
    private productService: ProductsService,
    private store: Store<{ products: response }>
  ) {}
  selectBy = 'By Name';
  selections = [
    'By Name',
    'By Id',
    'Price Greater Than',
    'Price Lower Than',
    'Price Equal To',
    'Quantity Greater Than',
    'Quantity Lower Than',
    'Quantity Equal To',
  ];
  searchTerm = '';

  searchBy(event: any): void {
    this.searchTerm = event.target.value;
  }

  search() {
    if (this.selectBy == 'By Name') {
      this.productService
        .getProductByName(this.searchTerm)
        .then((products) => {
          this.store.dispatch(
            setProducts({
              isLoading: false,
              error: false,
              data: products['data'],
            })
          );
        })
        .catch((error) => {
          console.log('error: ', error.message);
        });
    }
  }
}
