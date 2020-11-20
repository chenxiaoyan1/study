// var center = {
//     list:{},
//     add:function (eventName,fn) {
//         this.list[eventName] = fn
//     },
//     sub:function (eventName) {
//         this.list[eventName]()
//     }
// }
// var puber = {}
// puber.sendMsg=function(){
//     console.log("我发送消息了")
// }
// center.add("sendMsg",puber.sendMsg)
// var suber = {}
// center.sub("sendMsg")

function Subject(){
    this.observers = [];
}

Subject.prototype = {
    add:function(observer){  // 添加
        this.observers.push(observer);
    },
    remove:function(observer){  // 删除
        var observers = this.observers;
        for(var i = 0;i < observers.length;i++){
            if(observers[i] === observer){
                observers.splice(i,1);
            }
        }
    },
    notify:function(){  // 通知
        var observers = this.observers;
        for(var i = 0;i < observers.length;i++){
            observers[i].update();
        }
    }
}

function Observer(name){
    this.name = name;
}

Observer.prototype = {
    update:function(){  // 更新
        console.log('my name is '+this.name);
    }
}

var sub = new Subject();

var obs1 = new Observer('ttsy1');
var obs2 = new Observer('ttsy2');

sub.add(obs1);
sub.add(obs2);
sub.notify();  //my name is ttsy1、my name is ttsy2
