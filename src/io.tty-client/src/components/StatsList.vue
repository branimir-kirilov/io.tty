<template>
  <div class="hello">
    <amplify-authenticator></amplify-authenticator>
    <div v-if="stats">
      <Stats v-for="singleStat in stats" v-bind:key="singleStat.id" :stats="singleStat"/>
    </div>
  </div>
</template>

<script>
import { components, AmplifyEventBus } from 'aws-amplify-vue'
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { Auth } from 'aws-amplify';
import { mapState } from 'vuex';
import Stats from '@/components/Stats.vue';

export default {
  name: 'StatsList',
  created() {
    if(Auth.user) {
      this.$store.dispatch('getStats');
    }

    AmplifyEventBus.$on('authState', info => {
      console.log(`Here is the auth event that was just emitted by an Amplify component: ${info}`);

      if(info === 'signedIn' && Auth.user) {
         this.$store.dispatch('getStats');
      } 
    });
  },
  components: {
    Stats,
    ...components
  },
  computed: mapState({
      stats: state => state.stats,
      deviceId: state => state.deviceId
   })  
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
</style>
