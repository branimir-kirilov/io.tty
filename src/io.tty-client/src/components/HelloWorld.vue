<template>
  <div class="hello">
    <amplify-authenticator v-bind:authConfig="authConfig"></amplify-authenticator>
  </div>
</template>

<script>
import { components } from 'aws-amplify-vue'
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
  name: 'HelloWorld',
  created() {
    AmplifyEventBus.$on('authState', info => {
      console.log(`Here is the auth event that was just emitted by an Amplify component: ${info}`)
    });
  },
  components: {
    ...components
  }
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
