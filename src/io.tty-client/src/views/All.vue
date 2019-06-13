<template>
  <div class="home">
    <h5 class="body heading" >List of all stats</h5>
    <StatsList />
  </div>
</template>

<script>
// @ is an alias to /src
import StatsList from '@/components/StatsList.vue';

export default {
  name: 'home',
  components: {
    StatsList,
  },
};
</script>

<style>
.heading {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 95px;
  margin: 0 auto;
}

.body {
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    margin: 0;
}
</style>
