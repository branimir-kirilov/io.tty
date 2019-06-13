<template>
  <div id="app">
    <h1 class="heading">io.tty</h1>
    <h5 class="body heading" >Smart room monitoring</h5>
    <div id="nav">
      <router-link to="/">Current</router-link> |
      <router-link v-if="shouldShow" to="/all">All</router-link> <span v-if="shouldShow"> | </span>
      <router-link v-if="shouldShow" to="/chart">Chart</router-link> <span v-if="shouldShow"> | </span>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <amplify-sign-out class="sign-out" v-if="shouldShow"></amplify-sign-out>
  </div>
</template>

<script>
export default {
  computed: {
    shouldShow() {
      return !!this.$store.state.signedIn && this.$store.state.deviceId;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.sign-out {
  position: absolute;
  top: 25px;
  right: 25px;
}
</style>
