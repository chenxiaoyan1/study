import Vue from "../node_modules/vue/dist/vue";

//该方法的功能是可以将组件挂载到页面的任何位置上，而不仅仅是挂载到vue管理的区域
function create(component,props) {
    var vm = new Vue({
        //h是createElement 返回vnode 虚拟dom
        //需要挂载才能变成真实dom
        render:function (h) {
           //{props}这是一种当对象的key和value 一样时的缩写方式
            return h(component,{props},[])
        }
    }).$mount()//$mount是创建真实dom,当指定宿主元素，就会挂载真实dom到宿主元素上，若不指定宿主元素就只会创建真实dom。不会挂载到任何元素上，需要手动挂载

    //vm.$el获得真实dom，挂载到body上
    document.body.appendChild(vm.$el)
    //获得notice的虚拟dom
    const noticeVdom = vm.$children[0]
    //返回的是虚拟dom
    return noticeVdom;
}

export default create

