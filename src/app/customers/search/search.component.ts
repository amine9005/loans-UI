import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  selectBy = 'By Email';
  selections = ['By Email', 'By Name', 'By Id'];
  searchBy(value: string): void {
    // this.selectedCity = this.cityData[value][0];
  }
}
