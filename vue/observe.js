//observe.js
class Observe {
    constructor(data) {
        this.data = data
        this.observeUtil(this.data)

    }
    observeUtil(data){
        Object.keys(data).forEach(key=>{
            //这样就能避免null判断为object的情况了，typeof null=object  typeof undefined = undefined
            if(data[key] && typeof data[key] == "object"){
                this.observeUtil(data[key])
            }else {
                //这里定义临时值很有必有，否则，get方法会陷入死循环
                let temp = data[key];
                let dep = new Dep()
                Object.defineProperty(data,key,{
                        // enumerable : true,
                        // configurable : true,
                        get(){

                            Dep.target && dep.addWatcher(Dep.target)
                            return temp
                        },
                        set(newVal){
                            if(newVal !== temp){

                                //这里要将新值给get
                                temp=newVal
                                dep.notify(newVal)
                                return newVal
                            }
                        }
                    }
                )
            }
        })
    }
}

class Dep{
    constructor() {
        this.sub = []

    }
    //添加watcher方法
    addWatcher(watcher){
        this.sub.push(watcher)
        console.log(this.sub)
    }
    //数据被修改了，通知watcher修改视图
    notify(newVal){
        this.sub.forEach(w=>{
            w.update(newVal)
        })
    }
}
//观察者
class Watcher {
    constructor(cb) {
        this.cb = cb
        debugger
        Dep.target = this
    }
    update(newVal){
        //通知视图变化

        this.cb(newVal)
    }
}