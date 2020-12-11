
var MyPlugin;
MyPlugin = {
    install:function(Vue,options){

        Vue.sayHello=function(){
            console.log("hello my-plugin")
        }
        Vue.mixin({
            created:function(){
                //这里this指的是每个调用Vue构造函数的对象，根组件和各个组件对象
                console.log(this)
                console.log("插件 created")
            }
        })
    }
}
export default MyPlugin