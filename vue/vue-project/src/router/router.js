import Index from "../pages/index";
import HelloWorld from "../components/HelloWorld";
import VueRouter from "vue-router";

const routes = [
    { path: '/page1', component: Index },
    { path: '/page2', component: HelloWorld }
]


const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router