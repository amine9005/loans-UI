import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';

interface dict {
  key: string;
  value: number;
}
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

  title = 'Sales Data';
  selectBy = 'Sales';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [31, 65, 69, 71, 59, 66, 68],
        label: 'Sales',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;

  constructor(private dashboardService: DashboardService) {}

  dataByDate(filter: string): void {
    if (this.selectBy == 'Sales') {
      this.dashboardService
        .getSalesData(filter)
        .then((resp) => {
          console.log('sales Data: ', resp);
          const data = this.getDays(filter);

          resp.data['orders'].forEach((order: any) => {
            const date = new Date(order.dateCreated).toDateString();
            data.set(date, (data.get(date) as number) + 1);
          });

          this.lineChartData.labels = Array.from(data.keys());
          this.lineChartData.datasets = [
            {
              data: Array.from(data.values()),
              label: 'Sales',
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(255,0,0,0.3)',
            },
          ];

          console.log('line data: ', this.lineChartData.datasets);

          // this.lineChartData.datasets = resp.data['datasets'];
        })
        .catch((err) => {
          console.log('Unable to get Sales Data err: ', err.message);
        });
    } else if (this.selectBy == 'Inventory') {
      this.dashboardService
        .getInventoryData(filter)
        .then((resp) => {
          console.log('Inventory Data: ', resp);
          const data = this.getDays(filter);

          resp.data['products'].forEach((order: any) => {
            const date = new Date(order.dateCreated).toDateString();
            data.set(date, (data.get(date) as number) + 1);
          });

          this.lineChartData.labels = Array.from(data.keys());
          this.lineChartData.datasets = [
            {
              data: Array.from(data.values()),
              label: 'Inventory',
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(255,0,0,0.3)',
            },
          ];

          console.log('line data: ', this.lineChartData.datasets);

          // this.lineChartData.datasets = resp.data['datasets'];
        })
        .catch((err) => {
          console.log('Unable to get Inventory Data err: ', err.message);
        });
    } else if (this.selectBy == 'Orders') {
      this.dashboardService
        .getOrdersData(filter)
        .then((resp) => {
          console.log('Orders Data: ', resp);
          const data = this.getDays(filter);

          resp.data['orders'].forEach((order: any) => {
            const date = new Date(order.dateCreated).toDateString();
            data.set(date, (data.get(date) as number) + 1);
          });

          this.lineChartData.labels = Array.from(data.keys());
          this.lineChartData.datasets = [
            {
              data: Array.from(data.values()),
              label: 'Orders',
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(255,0,0,0.3)',
            },
          ];

          console.log('line data: ', this.lineChartData.datasets);

          // this.lineChartData.datasets = resp.data['datasets'];
        })
        .catch((err) => {
          console.log('Unable to get Orders Data err: ', err.message);
        });
    }
  }

  getDays(filter: string): Map<string, number> {
    const currentDate = new Date();
    const res = new Map();
    if (filter == '1W') {
      for (let i = 6; i > -1; i--) {
        res.set(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - i
          ).toDateString(),
          0
        );
      }
    } else if (filter == '1M') {
      for (let i = 30; i > -1; i--) {
        res.set(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - i
          ).toDateString(),
          0
        );
      }
    } else if (filter == '1Y') {
      const numberOfDays = this.days_of_a_year(currentDate.getFullYear());
      for (let i = numberOfDays; i > -1; i--) {
        res.set(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - i
          ).toDateString(),
          0
        );
      }
    } else if (filter == '2Y') {
      for (let j = 1; j > -1; j--) {
        const numberOfDays = this.days_of_a_year(currentDate.getFullYear() - j);
        for (let i = numberOfDays; i > -1; i--) {
          res.set(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() - i
            ).toDateString(),
            0
          );
        }
      }
    } else if (filter == '3Y') {
      for (let j = 2; j > -1; j--) {
        const numberOfDays = this.days_of_a_year(currentDate.getFullYear() - j);
        for (let i = numberOfDays; i > -1; i--) {
          res.set(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() - i
            ).toDateString(),
            0
          );
        }
      }
    } else if (filter == '5Y') {
      for (let j = 4; j > -1; j--) {
        const numberOfDays = this.days_of_a_year(currentDate.getFullYear() - j);
        for (let i = numberOfDays; i > -1; i--) {
          res.set(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() - i
            ).toDateString(),
            0
          );
        }
      }
    }
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

    this.dataByDate('1W');
  }
}
