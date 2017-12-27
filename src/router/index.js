import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Ask from '@/pages/ask'
import Good from '@/pages/good'
import Share from '@/pages/share'
import TopicDetail from '@/pages/topicDetail'
import Login from '@/pages/login'
import UserInfo from '@/pages/userInfo'
import NewTopic from '@/pages/newTopic'
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/good',
      name: 'good',
      component: Good
    },
    {
      path: '/ask',
      name: 'ask',
      component: Ask
    },
    {
      path: '/share',
      name: 'share',
      component: Share
    },
    {
      path: '/topicDetail/:id',
      name: 'topicDetail',
      props:'deep',
      meta:'deep',
      component: TopicDetail
    },
    {
      path:'/userInfo',
      name:'userInfo',
      component: UserInfo
    },
    {
      path: '/login/:redirect',
      name: 'login',
      meta:'deep',
      component: Login
    },
    {
      path:'/newTopic',
      name:'newTopic',
      meta:'deep',
      component:NewTopic
    }
  ]
})
