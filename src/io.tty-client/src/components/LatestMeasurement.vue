<template>
  <div class="hello">
    <div v-if="isAuthenticated && this.storedDeviceId && stats && !stats.length">
      <div>
        <span class="error">The device id is invalid. Please try again...</span>
      </div>
      <input tab-index="1" class="deviceInput" placeholder="Enter the device id, located on the back of device" type="text" v-model="deviceId" v-on:keyup.enter="submitDeviceId">
    </div>
    <div v-else-if="stats && isAuthenticated && this.storedDeviceId">
      <SingleMeasurement :stats="statsReversed[0]"/>
    </div>
    <div v-else-if="isAuthenticated && this.storedDeviceId">
      <span>Loading...</span>
    </div>
    <div v-else-if="isAuthenticated">
      <input tab-index="1" class="deviceInput" placeholder="Enter the device id, located on the back of device" type="text" v-model="deviceId" v-on:keyup.enter="submitDeviceId">
    </div>
  </div>
</template>

<script>
import { components, AmplifyEventBus } from 'aws-amplify-vue';
import { Auth } from 'aws-amplify';
import { mapState } from 'vuex';
import SingleMeasurement from '@/components/SingleMeasurement.vue';

export default {
  name: 'LatestMeasurement',
  async created() {
    this.$store.dispatch('getDeviceIdFromLocalStorage');

    AmplifyEventBus.$on('authState', (info) => {
      if (info === 'signedIn' && Auth.user) {
        this.$store.dispatch('signedIn');
        this.$store.dispatch('getStats');
      }

      if (info === 'signedOut') {
        this.$store.dispatch('signOut');
        this.$store.dispatch('removeStats');
        this.$store.dispatch('removeDeviceId');
      }
    });

    await Auth.currentAuthenticatedUser()
      .then(() => {
        this.$store.dispatch('signedIn');
        this.$store.dispatch('getStats');
      })
      .catch(() => {
        // TODO: dispatch action on failure
      });
  },
  components: {
    SingleMeasurement,
    ...components,
  },
  data() {
    return {
      deviceId: null,
      submited: false,
    };
  },
  computed: mapState({
    stats: state => state.stats,
    isAuthenticated: state => state.signedIn,
    storedDeviceId: state => state.deviceId,
    statsReversed() {
      return this.stats.slice().reverse();
    },
  }),
  methods: {
    submitDeviceId() {
      this.loading = true;
      this.$store.dispatch('setDeviceId', this.deviceId);
    },
  },
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.deviceInput {
  padding: 0 15px;
  margin: 150px auto;
  width: 800px;
  height: 40px;
  font-size: 24px;
  font-style: italic;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 10px;
  box-shadow: none;
  outline: none;
  -webkit-transition: all .1s ease-out;
  -moz-transition: all .1s ease-out;
  -ms-transition: all .1s ease-out;
  -o-transition: all .1s ease-out;
  transition: all .1s ease-out
}

.deviceInput:focus {
  box-shadow: none;
  outline: none;
  box-shadow: 0px 0px 5px 1px #38a071;
}

.auth {
  margin: 30px 0;
}

.error {
  font-size: 24px;
  color: red;
}

</style>
