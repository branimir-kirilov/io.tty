<template>
  <div class="home">
    <h1 class="heading">io.tty</h1>
    <h5 class="body heading" >Smart room monitoring</h5>
    <LatestMeasurement />
    <authenticator class="auth"></authenticator>
  </div>
</template>

<script>
// @ is an alias to /src
import LatestMeasurement from '@/components/LatestMeasurement.vue';
import { components, AmplifyEventBus } from 'aws-amplify-vue';

export default {
  name: 'home',
  components: {
    LatestMeasurement,
    ...components,
  },
};
</script>

<style>
.heading {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 95px;
  margin: 15px auto;
}

.body {
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    margin: 0;
}

.heading {
    margin-bottom: 25px;
}
</style>
