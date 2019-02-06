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
                    {{ stats.payload.state.reported.temp }} 
                  </td>
                  <td>
                    {{ stats.payload.state.reported.pressure }}
                  </td>
                  <td>
                    {{ stats.payload.state.reported.humidity }}
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
    }
  },
  created() {
    // AmplifyEventBus.$on('authState', info => {
    //   console.log(`Here is the auth event that was just emitted by an Amplify component: ${info}`)
    // });
  },
  computed: {
    isAuthenticated() {
      return !!Auth.user;
    } 
  },
  methods: {
    timeConverter(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

      return time;
    },
  }
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
