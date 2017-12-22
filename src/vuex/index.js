import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    pageLoading: false,
    hasLogon: false,
    showLogonPanel:false
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
      state.hasLogon = true;
    },
    
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
    }
  }
});
export default store;
