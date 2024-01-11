import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalSales = 31700;
  totalOrders = 124;
  totalProducts = 69;

  lineChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
    datasets: [{ data: [31, 65, 69, 71, 59, 66, 68], label: 'Sales' }],
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService
      .getInventory()
      .then((resp) => {
        this.totalProducts = resp.data['products'];
      })
      .catch((err) => {
        this.totalProducts = -1;
        console.log('error: ', err.message);
      });

    this.dashboardService
      .getTotalOrders()
      .then((resp) => {
        this.totalOrders = resp.data['orders'];
      })
      .catch((err) => {
        this.totalOrders = -1;
        console.log('error: ', err.message);
      });

    // this.dashboardService
    //   .getInventoryData('sales')
    //   .then((resp) => {
    //     this.lineChartData.labels = resp.data['labels'];
    //     this.lineChartData.datasets = resp.data['datasets'];
    //   })
    //   .catch((err) => {
    //     console.log('Unable to get Inventory Data err: ', err.message);
    //   });

    this.dashboardService
      .getSalesData('Today')
      .then((resp) => {
        console.log('sales Data: ', resp);
        // this.lineChartData.labels = resp.data['labels'];
        // this.lineChartData.datasets = resp.data['datasets'];
      })
      .catch((err) => {
        console.log('Unable to get Inventory Data err: ', err.message);
      });
  }
}
