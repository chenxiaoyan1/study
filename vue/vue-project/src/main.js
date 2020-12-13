import Vue from 'vue'
import App from './App.vue'
// import router from "./router/router";
import krouter from "./krouter/index";

import store from "./store/store";
import kstore from "./kstore/kstore";


Vue.config.productionTip = false

 new Vue({
  krouter,
  store,
  kstore,
  render: h => h(App),
}).$mount('#app')



