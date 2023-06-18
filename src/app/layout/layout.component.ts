import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  iconsStyle = {
    fontSize: '20px',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['']);
  }
}
