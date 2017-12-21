// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/theme/index.css';
import './assets/theme/pagination.css';
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

import ElementUI from 'element-ui';
import Service from './serveice/serveConfig';


Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$service=Service;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
