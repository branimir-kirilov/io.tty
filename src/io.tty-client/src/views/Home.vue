<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <StatsList msg="Welcome to Your Vue.js App"/>
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
