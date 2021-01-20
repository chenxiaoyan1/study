import Vue from 'vue'
import App from './App.vue'
// import router from "./router/router";
// import krouter from "./krouter/index";
//
// import store from "./store/store";
// import kstore from "./kstore/kstore";


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.config.productionTip = false

 new Vue({
  // krouter,
  // store,
  // kstore,
  render: h => h(App),
}).$mount('#app')



