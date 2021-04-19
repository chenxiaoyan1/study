var max = document.getElementById("max")
var middle = document.getElementById("middle")
var min = document.getElementById("min")
max.addEventListener("click",function(){
    console.log("max 捕获事件")
},true)
max.addEventListener("click",function(){
    console.log("max 冒泡事件")
},false)



middle.addEventListener("click",function(){
    console.log("middle 捕获事件")
},true)

middle.addEventListener("click",function(){
    console.log("middle 冒泡事件")
},false)


// min.addEventListener("click",function(){
//     console.log("min 冒泡事件")
// },false)
//
// min.addEventListener("click",function(){
//     console.log("min 捕获事件")
// },true)


var elem = document.querySelector('#min');

var event = document.createEvent('Event');

// 定义事件名称myEvent
event.initEvent('myEvent', true, true);

// 监听myEvent
elem.addEventListener('myEvent', function (e) {
    if(!flag){
        return;
    }
    console.log("min 捕获事件")
}, true);

// 使用目标对象去派发事件，可以是元素节点/事件对象
// elem.dispatchEvent(event);
var flag= false;
elem.addEventListener("click",function(){
    console.log("min 冒泡事件---这里冒泡事件先执行了")
    flag = true;
    elem.dispatchEvent(event);
},false)







