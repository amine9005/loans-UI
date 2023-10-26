import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  // constructor(private productService: ProductService) {}
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

  searchBy(value: string): void {
    this.selectBy = value;
  }

  search() {
    if (this.selectBy == 'By Name') {
      console.log('Searching...');
    }
  }
}
