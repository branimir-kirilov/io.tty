<template>
  <div class="hello">
      <div v-if="isAuthenticated"> {{ stats }}</div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';

export default {
  name: 'HelloWorld',
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
