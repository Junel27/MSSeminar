import Vue from "vue";
import Vuex from "vuex";
import orientation from './modules/orientation'
import authentication from './modules/authentication'
import awit from './modules/awit'
import settings from './modules/settings'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    orientation,
    awit,
    settings,
    authentication
  }
});
