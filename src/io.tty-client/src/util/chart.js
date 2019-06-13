import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    yAxis: {
      type: Array,
      default: null,
    },
    xAxis: {
      type: Array,
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#f87979',
    },
  },
  data() {
    // const temp = this.stats.map(stat => stat.payload.state.reported.temp);
    // const timestamps = this.stats.map(stat => this.timeConverter(stat.timestamp));

    return {
      datacollection: {
        // Data to be represented on x-axis
        labels: this.yAxis,
        datasets: [{
          label: this.label,
          backgroundColor: this.color,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
          // Data to be represented on y-axis
          data: this.xAxis,
        }],
      },
      // Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
            },
            gridLines: {
              display: true,
            },
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
          }],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    // renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.datacollection, this.options);
  },
};
