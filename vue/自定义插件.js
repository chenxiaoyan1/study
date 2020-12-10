
var MyPlugin;
MyPlugin = {
    install:function(Vue,options){
        Vue.sayHello=function(){
            console.log("hello my-plugin")
        }
    }
}
export default MyPlugin