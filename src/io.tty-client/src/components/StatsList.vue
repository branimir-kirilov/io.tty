<template>
  <div class="hello">
    <amplify-authenticator></amplify-authenticator>
    <div v-if="stats && isAuthenticated && this.storedDeviceId">
      <SingleMeasurment v-for="singleStat in stats" v-bind:key="singleStat.timestamp" :stats="singleStat"/>
    </div>
    <div v-else-if="isAuthenticated && this.storedDeviceId">
      <span>Loading...</span>
    </div>
    <div v-else>
      <input class="deviceInput" placeholder="Enter Your Unique Device Id" type="text" v-model="deviceId" v-on:keyup.enter="submitDeviceId">
    </div>
  </div>
</template>

<script>
import { components, AmplifyEventBus } from 'aws-amplify-vue';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { Auth } from 'aws-amplify';
import { mapState } from 'vuex';
import SingleMeasurment from '@/components/SingleMeasurment.vue';

export default {
  name: 'StatsList',
  async created() {
    this.$store.dispatch('getDeviceIdFromLocalStorage');

    AmplifyEventBus.$on('authState', (info) => {
      console.log(`Here is the auth event that was just emitted by an Amplify component: ${info}`);
      if (info === 'signedIn' && Auth.user) {
        this.$store.dispatch('signedIn');
        this.$store.dispatch('getStats');
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
    SingleMeasurment,
    ...components,
  },
  data() {
    return {
      deviceId: null,
    };
  },
  computed: mapState({
    stats: state => state.stats,
    isAuthenticated: state => state.signedIn,
    storedDeviceId: state => state.deviceId,
  }),
  methods: {
    submitDeviceId() {
      console.log('dispatching');
      this.$store.dispatch('setDeviceId', this.deviceId);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  margin: 150px auto;
  width: 500px;
  height: 50px;
  font-size: 23px;
  font-style: italic;
}
</style>
