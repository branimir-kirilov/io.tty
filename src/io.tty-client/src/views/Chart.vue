<template>
    <div>
        <amplify-authenticator class="auth"></amplify-authenticator>
        <div v-if="stats">
            <chartjs class="chart" :xAxis="temps" :yAxis="timestamps" label="Temperature (°C)" />
            <chartjs class="chart" :xAxis="pressures" :yAxis="timestamps" label="Pressures (hPa)" color="green" />
            <chartjs class="chart" :xAxis="humidities" :yAxis="timestamps" label="Humidity (% RH)" color="blue" />
        </div>
    </div>
</template>

<script>
import chartjs from '@/util/chart';
import { mapState } from 'vuex';
import { components, AmplifyEventBus } from 'aws-amplify-vue';

export default {
  name: 'chart',
  components: {
    chartjs,
    ...components,
  },
  computed: mapState({
    stats: state => state.stats,
    isAuthenticated: state => state.signedIn,
    storedDeviceId: state => state.deviceId,
    temps() {
      return this.stats.map(stat => stat.payload.state.reported.temp);
    },
    humidities() {
      return this.stats.map(stat => stat.payload.state.reported.humidity);
    },
    pressures() {
      return this.stats.map(stat => stat.payload.state.reported.pressure);
    },
    timestamps() {
      return this.stats.map(stat => this.timeConverter(stat.timestamp));
    },
  }),
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
};
</script>

<style scoped lang="scss">
.chart {
    width: 850px;
    margin: 0 auto;
}
</style>
