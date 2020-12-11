import klink from "./link";
import kview from "./view";

let Vue
class KVueRouter {
    constructor(options) {
        this.options = options
        //将current响应式化，监听他的变化，他一变化，用到他的地方自动调用
        Vue.util.defineReactive(this,"current","/")
    }
}
KVueRouter.install=function (_Vue) {
    //要先执行此方法（即先use）,才能new KVueRouter 因为要先在这里执行Vue的赋值，若先执行new VueRouter会报错
    Vue = _Vue;
    console.log("-------")
    _Vue.mixin({
        beforeCreate:function(){
            //只有根实例才有krouter
            if(this.$options.krouter){
                //this指对应的组件
                _Vue.prototype.$router = this.$options.krouter
            }
        }
    })

    Vue.component("krouter-link",klink)
    Vue.component("krouter-view",kview)
}


export default KVueRouter