 // 注册一个全局自定义指令 `v-focus`
  	//第一个参数是指令的名字，在使用的时候，在名称的前边加上v-
  	//如果是驼峰命名法的名称，则在使用的时候需要把驼峰转为小写，使用-连接
  	//第二个参数就是需要配置指令的生命钩子函数
  	/*
  	每个钩子函数都可以接收两个参数:
  	el   作用该指令的DOM对象
  	binding 一个对象，可以获取指令的值等信息，是指令所在节点的
  	
  	指令是可以传值的，例如v-show="布尔值"
  	*/
      Vue.directive('focus', {
          //bind和inserted相同之处在于一上来就执行一次，以后再也不会执行
          //不同之处在于bind拿不到父元素，inserted可以拿到父元素(还有一个特别的是el.focus得写在inserted中，写在bind中不生效)
        bind:function(){
            
        },
        inserted: function (el,binding) {
          // 聚焦元素
          el.focus()
        },
          //update和componentUpdated只有当该指令所在的模板（不是所在节点）发生更新才会触发调用，所在模板也就是指令所处的vue管理的模板，就是说，当两个节点处于同一个被vue管理的模板中，一个绑定了自定义指令，另一个没有，当未绑定自定义指令的节点发生变化的时候，也会触发自定义指令的update和componentUpdated方法
          //update和componentUpdated的区别
       	//update:所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
  		//componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
         update:function(){
             
         },
          componentUpdated:function(){
              
          },
          //只调用一次，指令和元素解绑时调用
          //做一些收尾工作，例如清除定时器
          unbind:function(){
              
          }
      })