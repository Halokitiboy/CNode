// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import moment from 'moment';
import Toasted from 'vue-toasted';
import Service from './serveice/serveConfig';
import './assets/Font-Awesome-3.2.1/css/font-awesome.css';
import VueQuillEditor, {Quill} from 'vue-quill-editor';
import store from './vuex/index';
Vue.use(Toasted, {
  theme: "primary",
  position: "top-center",
  duration: 2000,
  icon: {
    name: 'error'
  }
})
moment.locale('zh-cn');
Vue.use(MuseUI);
Vue.config.productionTip = false;
Vue.prototype.$service = Service;
Vue.prototype.$moment = moment;
Vue.prototype.$CryptoJS = CryptoJS;
// require styles
Vue.use(VueQuillEditor, {
  modules: {
    toolbar: [
      [{'size': ['small', false, 'large', 'huge']}],
      ['bold', 'italic'],
      [{'list': 'ordered'}, {'list': 'bullet'}]
    ],
    history: {
      delay: 1000,
      maxStack: 50,
      userOnly: false
    }
  }
});
const CryptoJS = require("crypto-js");



router.beforeEach((to, from, next) => {
  // this route requires auth, check if logged in
  // if not, redirect to login page.
  console.log(to.meta);
  if (to.meta === 'deep') {
    store.dispatch('showBar', {show: false});
    
  } else {
    store.dispatch('showBar', {show: true});
    
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
