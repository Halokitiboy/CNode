// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/theme/index.css';
import './assets/theme/pagination.css';
import ElementUI from 'element-ui';
import Service from './serveice/serveConfig';

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$service=Service;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
