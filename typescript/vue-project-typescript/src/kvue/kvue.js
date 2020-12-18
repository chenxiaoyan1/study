class KVue {
    constructor(options) {
        this.options = options
        this.$data = options.data
        //数据响应式
        this.observe(this.$data)
        //编译模板
        this.compile(document.querySelector(options.el),this)

    }
    observe (data){
        Object.keys(data).forEach(i=>{
            defineReactive(data,i,data[i])
        })
    }
    compile(el){
        if(!el){
            return false
        }
        el.childNodes.forEach(node=>{
            if(this.isElement(node)){
                //元素节点
                if(node.childNodes.length>0){
                    this.compile(node)
                }
                this.compileElement(node)

            }else if(this.direc(node)){
                //插值处理
                this.compileText(node)
            }
        })
    }

    isElement(node){
        return node.nodeType === 1
    }

    direc(node){
        let patt = /{{(\D+)}}/
        return node.nodeType == 3 && patt.test(node.nodeValue)
    }

    compileElement(node){
        //解析指令
        [...node.attributes].forEach(attr=>{
            if(this.isDirective(attr)){
                //是指令
                let expr = attr.nodeName.substring(2)//text
                this.update(node,expr,attr.nodeValue)
            }
        })
    }

    compileText(node){
        //解析插值
        this.update(node,"text",RegExp.$1)
    }
    //update(node,"html","helloHtml")
    update(node,expr,val){
        //这里new Watcher 第一次初始化时候
        let watcher = new Watcher(node,expr,val,this[expr+"Updater"],this)
        Dep.target = watcher
        this[expr+"Updater"](node,expr,val)
    }
    textUpdater(node,expr,val){
        //简单处理，没有考虑多层对象
        node.textContent = this.getExprValue(val)
    }
    htmlUpdater(node,expr,val){
        node.innerHTML = this.getExprValue(val)
    }
    //获得对象中某属性的值，简单处理，没有考虑多层的情况
    getExprValue(expr){
        return this.$data[expr]
    }
    //是否是指令
    isDirective(attr){
        return attr.nodeName.startsWith("k-")
    }

    
}
function defineReactive(obj,key,val) {
    if(val && typeof val == "object" && !Array.isArray(val)){
        observe(val)
    }
    //每一个属性对应一个dep 属性和dep之间是一对一
    let dep = new Dep()
    Object.defineProperty(obj,key,{
        get() {
            dep.addSub(Dep.target)
            return val
        },
        set(newVal) {
            if(val !== newVal){
                val = newVal
                dep.notify()
            }
        }
    })
}


class Dep {
    constructor() {
        this.subs = []
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    notify(){
        console.log(this.subs)
        this.subs.forEach(w=>{
            w.update()
        })
    }

}

class Watcher {
    constructor(node,expr,val,fn,vm) {
        this.node = node
        this.expr = expr
        this.val = val
        this.fn = fn
        this.vm = vm

    }
    update(){
        console.log("update")
        this.fn.bind(this.vm)(this.node,this.expr,this.val)
    }
}