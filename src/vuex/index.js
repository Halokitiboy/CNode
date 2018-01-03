import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    pageLoading: false,
    hasLogon: false,
    showLogonPanel:false,
    showBar:true,
    recent_replies:null,
    recent_topics:null,
    accesstoken:'',//存取用户accesstoken
    userInfo:''//存取用户信息
  },
  mutations: {
    hidePageLoading(state, payload) {
      state.pageLoading = payload.pageLoading;
      console.log(state.pageLoading)
    },
    logonIn(state) {
      state.hasLogon = true;
    },
    logonOut(state) {
      localStorage.clear();
      sessionStorage.clear();
      state.hasLogon = false;
    },
    showBar(state,payload){
      state.showBar=payload.show;
    },
    getAccesstoken(state,payload){
      state.accesstoken=payload.accesstoken;
    },
    getUserInfo(state){
      state.userInfo=JSON.parse(localStorage.getItem('userInfo'))|| JSON.parse(sessionStorage.getItem('userInfo'));
    },
    setRecentTopics(state){
      state.recent_topics=JSON.parse(sessionStorage.getItem('recent_topics'));
    },
    setRecentReplies(state){
      state.recent_replies=JSON.parse(sessionStorage.getItem('recent_replies'));
    },
    clearUserInfo(state){
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
