<template>
  <div class="hello">
    <div v-if="stats && isAuthenticated && this.storedDeviceId">
      <SingleMeasurmentShort
        v-for="singleStat in statsReversed"
        v-bind:key="singleStat.timestamp"
        :stats="singleStat"
      />
    </div>
    <div v-else-if="isAuthenticated && this.storedDeviceId">
      <span>Loading...</span>
    </div>
    <div v-else-if="isAuthenticated">
      <input class="deviceInput"
        placeholder="Enter Your Unique Device Id"
        type="text" v-model="deviceId"
        v-on:keyup.enter="submitDeviceId"
      >
    </div>
  </div>
</template>

<script>
import { components, AmplifyEventBus } from 'aws-amplify-vue';
import { Auth } from 'aws-amplify';
import { mapState } from 'vuex';
import SingleMeasurmentShort from '@/components/SingleMeasurmentShort.vue';

export default {
  name: 'StatsList',
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
    SingleMeasurmentShort,
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
    statsReversed() {
      return this.stats.slice().reverse();
    },
  }),
  methods: {
    submitDeviceId() {
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
  margin: 150px auto;
  width: 500px;
  height: 50px;
  font-size: 23px;
  font-style: italic;
}

.auth {
  margin: 30px 0;
}

</style>
