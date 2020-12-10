import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import HelloWorld from "./components/HelloWorld";
import Index from "./pages/index"

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { path: '/page1', component: Index },
  { path: '/page2', component: HelloWorld }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
