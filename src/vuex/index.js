import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    pageLoading: false
  },
  mutations: {
    hidePageLoading(state,payload) {
      state.pageLoading = payload.pageLoading;
      console.log( state.pageLoading)
    }
  },
  actions: {
    hidePageLoading(context) {
      context.commit('hidePageLoading');
    }
  }
});
export default store;
