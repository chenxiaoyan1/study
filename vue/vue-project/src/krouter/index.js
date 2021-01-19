import Index from "../pages/index";
import HelloWorld from "../components/HelloWorld";
import Vue from 'vue'
import KVueRouter from "./KVueRouter";
Vue.use(KVueRouter)
const routes = [
    { path: '/page1', component: Index },
    { path: '/page2', component: HelloWorld },
    { path: '/page3', component: HelloWorld }
]


const krouter = new KVueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default krouter;