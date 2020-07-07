import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import InputTag from 'vue-input-tag'


Vue.config.productionTip = false;
const axios = require("axios").default;
Vue.prototype.$http = axios;
Vue.component('input-tag', InputTag)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
