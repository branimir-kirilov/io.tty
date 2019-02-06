<template>
  <div class="main">
      <div class="single-measurement-wrapper" v-if="isAuthenticated">
          <div class="date">
            {{ this.timeConverter(stats.timestamp) }}
          </div>
          <div class="measurements-wrapper">
            <table>
              <thead>
                <th class="table-header">Temperature</th>
                <th class="table-header">Humidity</th>
                <th class="table-header">Pressure</th>
              </thead>
              <tbody>
                <tr>
                  <td>
                     <strong> {{ stats.payload.state.reported.temp }}°C </strong>
                  </td>
                  <td>
                    <strong> {{ stats.payload.state.reported.pressure.toFixed(3) }} hPa </strong>
                  </td>
                  <td>
                    <strong> {{ stats.payload.state.reported.humidity.toFixed(3) }} % RH </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';

export default {
  name: 'SingleMeasurment',
  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
  created() {
    // AmplifyEventBus.$on('authState', info => {
    //   console.log(`Here is the auth event that was just emitted by an Amplify component: ${info}`)
    // });
  },
  computed: {
    isAuthenticated() {
      return !!Auth.user;
    },
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
      const time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;

      return time;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  text-align: center;
  position: relative;
  width: 550px;
  margin: 0 auto;
}
.single-measurement-wrapper {
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 25px;
  padding: 15px;
  background-color: rgba(12, 185, 55, 0.5);
  text-align: center;
  position: relative;
}
.measurements-wrapper {
  margin: 0 auto;
}
.table-header {
  font-size: 22px;
  padding: 25px;
  font-style: italic;
}
.date {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-style: italic;
  float: left;
}
</style>
