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

  available_dates = ['1W', '1M', 'YTD', '1Y', '2Y', '3Y', '5Y', 'ALL'];

  lineChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
    datasets: [{ data: [31, 65, 69, 71, 59, 66, 68], label: 'Sales' }],
  };

  constructor(private dashboardService: DashboardService) {}

  dataByDate(filter: string): void {
    this.dashboardService
      .getSalesData(filter)
      .then((resp) => {
        console.log('sales Data: ', resp);
        this.getDays(filter);
        // this.lineChartData.labels = resp.data['labels'];
        // this.lineChartData.datasets = resp.data['datasets'];
      })
      .catch((err) => {
        console.log('Unable to get Inventory Data err: ', err.message);
      });
  }

  getDays(filter: string): Array<Date> {
    const currentDate = new Date();
    const res: Array<Date> = [];
    if (filter == '1W') {
      for (let i = 6; i > -1; i--) {
        res.push(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - i
          )
        );
      }
    } else if (filter == '1M') {
      for (let i = 30; i > -1; i--) {
        res.push(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - i
          )
        );
      }
    } else if (filter == '1Y') {
      const numberOfDays = this.days_of_a_year(currentDate.getFullYear());
      for (let i = numberOfDays; i > -1; i--) {
        res.push(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - i
          )
        );
      }
    } else if (filter == '2Y') {
      for (let j = 0; j < 2; j++) {
        const numberOfDays = this.days_of_a_year(currentDate.getFullYear() - j);
        for (let i = numberOfDays; i > -1; i--) {
          res.push(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() - i
            )
          );
        }
      }
    }
    // console.log('Dates array: ', res);
    return res;
  }

  days_of_a_year(year: number): number {
    return this.isLeapYear(year) ? 366 : 365;
  }

  isLeapYear(year: number): boolean {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }

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
