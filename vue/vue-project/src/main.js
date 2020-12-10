import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import KVueRouter from "./krouter/KVueRouter";
import router from "./router/router";

Vue.use(VueRouter)
Vue.use(KVueRouter)

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
