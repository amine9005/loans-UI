import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent {
  @Input() available_dates = ['1W', '1M', 'YTD', '1Y', '2Y', '3Y', '5Y', 'ALL'];

  @Input() title = 'Sales Data';
  @Input() selectBy = 'Sales';

  @Input() lineChartData: ChartConfiguration<'line'>['data'] = {
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
  @Input() lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  @Input() lineChartLegend = true;
}
