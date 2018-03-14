import Vue from 'vue';
import Router from 'vue-router';
import EchartOne from '@/components/echart-1';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EchartOne',
      component: EchartOne,
    },
  ],
});
