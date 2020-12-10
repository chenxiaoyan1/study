import Index from "../pages/index";
import HelloWorld from "../components/HelloWorld";
import KVueRouter from "./KVueRouter";

const routes = [
    { path: '/page1', component: Index },
    { path: '/page2', component: HelloWorld }
]


const krouter = new KVueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default krouter;