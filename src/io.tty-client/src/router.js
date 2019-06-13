import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
    },
    {
      path: '/all',
      name: 'all',
      component: () => import(/* webpackChunkName: "home" */ './views/All.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import(/* webpackChunkName: "chart" */ './views/Chart.vue'),
      beforeEnter: (to, from, next) => {
        if (store.state.signedIn && store.state.stats) {
          next();
        } else {
          next(false);
        }
      },
    },
  ],
});
