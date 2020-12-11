import Vue from 'vue'
import App from './App.vue'
// import router from "./router/router";
import krouter from "./krouter/index";


Vue.config.productionTip = false


 new Vue({
  krouter,
  render: h => h(App),
}).$mount('#app')



