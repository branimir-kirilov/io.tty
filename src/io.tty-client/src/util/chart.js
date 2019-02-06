import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    stats: {
      type: Array,
      default: null,
    },
  },
  data() {
    const temp = this.stats.map(stat => stat.payload.state.reported.temp);
    const timestamps = this.stats.map(stat => this.timeConverter(stat.timestamp));

    return {
      datacollection: {
        // Data to be represented on x-axis
        labels: timestamps,
        datasets: [{
          label: 'Data One',
          backgroundColor: '#f87979',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
          // Data to be represented on y-axis
          data: temp,
        }],
      },
      // Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
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
  methods: {
    timeConverter(UNIX_timestamp) {
      const a = new Date(UNIX_timestamp * 1);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const year = a.getFullYear();
      const month = months[a.getMonth()];
      const date = a.getDate();
      const hour = a.getHours();
      const min = a.getMinutes();
      const sec = a.getSeconds();
      const time = `${date} ${month} ${hour}:${min}:${sec}`;

      return time;
    },
  },
  mounted() {
    // renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.datacollection, this.options);
  },
};
