import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    pageLoading: true,//加载loading
    hasLogon: false,//是否登录
    showLogonPanel:false, //是否显示登录面板
    showBar:true,
    recent_replies:null,
    recent_topics:null,
    accesstoken:'',//存取用户accesstoken
    userInfo:'',//存取用户信息
    showBigImg:'false'
  },
  mutations: {
    updatePageLoading(state, pageLoading) {//页面跳转更新loading
      state.pageLoading = pageLoading;
    },
    updateBigImg(state,show){
      state.showBigImg=show;
    },
    logonIn(state) {//登录
      state.hasLogon = true;
    },
    logonOut(state) {//登出
      localStorage.clear();
      sessionStorage.clear();
      state.hasLogon = false;
    },
    showBar(state,payload){//转换header样式
      state.showBar=payload.show;
    },
    getAccesstoken(state,payload){//获取accesstoken
      state.accesstoken=payload.accesstoken;
    },
    getUserInfo(state){//获取用户信息
      state.userInfo=JSON.parse(localStorage.getItem('userInfo'))|| JSON.parse(sessionStorage.getItem('userInfo'));
    },
    setRecentTopics(state){
      state.recent_topics=JSON.parse(sessionStorage.getItem('recent_topics'));
    },
    setRecentReplies(state){
      state.recent_replies=JSON.parse(sessionStorage.getItem('recent_replies'));
    },
    clearUserInfo(state){//清除用户信息
      state.userInfo='';
    }
  },
  actions: {
    hidePageLoading({commit}) {
      commit('hidePageLoading');
    },
    logonIn({commit}) {
      commit('logonIn');
    },
    logonOut({commit}) {
      commit('logonOut');
    },
    showBar({commit},payload){
      commit('showBar',payload);
    },
    getAccesstoken({commit},payload){
      commit('getAccesstoken',payload);
    },
    getUserInfo({commit},payload){
      commit('getUserInfo',payload);
    },
    clearUserInfo({commit}){
      commit('clearUserInfo');
    }
  }
});
export default store;
