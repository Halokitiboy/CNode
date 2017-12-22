// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import moment from 'moment';
        moment.locale('zh-cn');
Vue.use(MuseUI);
import './assets/Font-Awesome-3.2.1/css/font-awesome.css';
import VueQuillEditor, { Quill } from 'vue-quill-editor';
import store from './vuex/index';

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor,{
  modules: {
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image']
    ],
    history: {
      delay: 1000,
      maxStack: 50,
      userOnly: false
    }
  }
});
import Service from './serveice/serveConfig';
const CryptoJS = require("crypto-js");
Vue.config.productionTip = false;
Vue.prototype.$service=Service;
Vue.prototype.$moment=moment;
Vue.prototype.$CryptoJS=CryptoJS;
const accesstoken='07287e25-48a1-402b-88af-0841e945e961';
sessionStorage.setItem('accesstoken', accesstoken);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
