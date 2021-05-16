# vue更新流程(源码角度来说)

> 参考https://blog.csdn.net/qq_29582173/article/details/103012927



![](vue更新流程.png)

总结：
- 当触发数据更新操作时，Vue在更新DOM时是异步执行的，当数据变化，dep通知watcher进行数据更新，Vue会开启一个队列，将watcher加入到队列中，并且同一个watcher如果被多次触发，只推进去一次，然后在下一个事件循环“tick”中，vue刷新队列并执行实际（已去重）工作，vue在内部对异步队列尝试使用原生的Promise.then,MutationObserver和setImmediate如果环境不支持这些，则会采用setTimeout(fn,o)代替

- nextTick理解
> nextTick 如果想要更新操作之后，获得更新后的dom ,就用nextTick(callback)，这样在回调函数中就可以获得更新后的dom了
> 原理：vue将nextTick的回调放到队列中，通过异步方法清空这个队列，dom更新和nextTIck回调先后执行，这个异步任务，vue会根据浏览器环境分别尝试采用Promise,MutationObserver,setImmediate,如果以上都不行就采用setTimeout
```js
 	this.name = "after"
   this.$nextTick(function(){
   alert(document.getElementById("str").innerHTML)//after
   })
```
如果这样写，那么按照上面图片中的流程，callbacks中先push了flushSchedulerQueue,然后push了这个定义的nextTIck,遍历callbacks,flushSchedulerQueue先执行，将dom更新完毕，所以在nexttick中可以获得更新后的dom
```js
   this.$nextTick(function(){
   alert(document.getElementById("str").innerHTML)//before
   })
   this.name = "after"
```
如果这样写，那么按照上面图片中的流程，callbacks先push了这个自定义的nextTIck,然后push了f lushSchedulerQueue,遍历callbacks,先执行$nextTick这个回调，此时dom还没有更新，所以获得之前的数据，然后flushSchedulerQueue执行，do m更新
所以：想要获得DOM更新后的数据，要将$nextTick放到更新操作后，让更新数据先入列，这样才能获得更新后的数据，如果写到更新操作之前，在更新数据之前入列，那么获取不到更新后的数据