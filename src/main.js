import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios'

// base url
const baseDomain = "https://event.fourello.com"
const eventSlug = 'seminar'
const version = 'v2'
const baseURL = `${baseDomain}/api/${version}/${eventSlug}`

// ALL DEFAULT CONFIGURATION HERE
Vue.prototype.$http = axios.create({baseURL})

// gets the settings from the server
store.dispatch('settings/fetchSettings', eventSlug)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,

  render: function (h) {
    return h(App);
  },
}).$mount("#app");
