import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  selectBy = 'Address';
  selections = [
    'Address',
    'TotalPrice Greater Than',
    'TotalPrice Lower Than',
    'TotalPrice Equal Than',
  ];
  searchTerm = '';

  searchBy(value: string): void {
    this.selectBy = value;
  }

  search() {
    console.log('searching');
  }
}
