// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui/dist/theme-carbon.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import moment from 'moment';
import Toasted from 'vue-toasted';
import Service from './serveice/serveConfig';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css' //样式文件
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  })
});
import VueQuillEditor, {Quill} from 'vue-quill-editor';
import store from './vuex/index';
Vue.use(Toasted, {
  theme: "primary",
  position: "top-center",
  duration: 2000,
  icon: {
    name: 'error'
  }
});
moment.locale('zh-cn');
Vue.use(MuseUI);
Vue.config.productionTip = false;
Vue.prototype.$service = Service;
Vue.prototype.$moment = moment;
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

let accesstoken = localStorage.getItem('accesstoken') || sessionStorage.getItem('accesstoken');
let userInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
router.beforeEach((to, from, next) => {
  // console.log(to.name);
  store.commit('updatePageLoading',true)
  console.log(new Date())
  document.title = to.name;
  // this route requires auth, check if logged in
  // if not, redirect to login page.
  
  // 判断是否登录
  if (accesstoken && userInfo) {
    store.dispatch('getAccesstoken', {'accesstoken': accesstoken});
    store.dispatch('getUserInfo', {'userInfo': userInfo});
    store.dispatch('logonIn');
  }
  //判断是否详情路由
  if (to.meta.deep) {
    store.dispatch('showBar', {show: false});
  } else {
    store.dispatch('showBar', {show: true});
  }
  next()
});
router.afterEach(function (to) {
  // const route_name=to.name;
  // if(route_name==="userInfo"){
  //   store.commit('updatePageLoading',false)
  // }
  // setTimeout(()=>{
  store.commit('updatePageLoading',false)
  // },500)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
