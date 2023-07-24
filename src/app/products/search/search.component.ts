import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
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
    console.log('Searching...');
  }
}
