import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    pageLoading: false,
    hasLogon: false,
    showLogonPanel:false,
    showBar:true,
    accesstoken:''
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
      state.hasLogon = false;
    },
    showBar(state,payload){
      state.showBar=payload.show;
    },
    getAccesstoken(state,payload){
      state.accesstoken=payload.accesstoken;
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
    }
  }
});
export default store;
