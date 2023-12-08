import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  totalSales = 31700;
  totalOrders = 124;
  totalProducts = 69;

  lineChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
    datasets: [{ data: [31, 65, 69, 71, 59, 66, 68], label: 'Sales' }],
  };
}
