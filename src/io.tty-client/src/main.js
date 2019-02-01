import Vue from 'vue';
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import awsmobile from './aws-exports';
import App from './App.vue';
import router from './router';
import store from './store';

Amplify.configure(awsmobile);

Vue.use(AmplifyPlugin, AmplifyModules);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
