class MVue{
    constructor(options) {
        this.$data = options.data
        this.$el = options.el
        this.$options = options
        if(this.$el){
            this.$el =  this.ifElement(this.$el)?this.$el:document.querySelector(this.$el)
        }
        new Compile(this.$el,this);
    }
    ifElement(el){
        return el.nodeType === 1
    }
}

class Compile{
    constructor(el,vm) {
        this.$el = el
        this.$vm = vm;
        //1、文档片段对象
        var fragment =  document.createDocumentFragment();
        this.element2Fragment(this.$el,fragment);
        //2、编译el
        this.compile(fragment)
        //3、将文档碎片对象添加进el中，页面显示
        this.$el.appendChild(fragment)
    }
    compile(fragment){
        [...fragment.childNodes].forEach(i=>{
            if(this.ifElement(i)){
                //元素节点
                this.compileElement(i)
            }else{
                //文本节点
                this.compileText(i)
            }
            //递归遍历
            if(i.childNodes&& i.childNodes.length){
                this.compile(i)
            }
        })
    }
    compileElement(element){
        //编译指令
        [...element.attributes].forEach(j=>{//v-text="msg",v-html="html",type="type"
            let {name,value} = j//v-text,msg
            if(this.ifDirective(name)){
                let [,realDirective] = name.split("-")//text,html
                this.compileDirective[realDirective](element,value)
            }
        })
    }
    compileText(textNode){
        let text = textNode.nodeValue;
        //这里有点神
        let  val = text.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1]);
        })
        updater.textUpdater(textNode,val)
    }
    ifElement(el){
        return el.nodeType === 1
    }
    //是否是vue指令
    ifDirective(attrName){
        return attrName.startsWith("v-")
    }

    element2Fragment(el,fragment){
        [...el.childNodes].forEach(e=>{
            fragment.appendChild(e)
        })
    }
    getVal(expr){
        //这里很是精妙
        let attrs = expr.split(".")
        return attrs.reduce((accumulator, currentValue,index,attrs)=>{
            return accumulator[currentValue]
        },this.$vm.$data)
    }
    compileDirective={
        text: (element,expr)=> {
            const value = this.getVal(expr)
            updater.textUpdater(element,value)
        },
        html: (element,expr)=> {
            const value = this.getVal(expr)
            updater.htmlUpdater(element,value)
        },
        model: (element,expr)=> {
            const value = this.getVal(expr)
            updater.modelUpdater(element,value)
        }
    }
}

let updater={
    attrUpdater(node, attrName, attrVal){
        node.setAttribute(attrName,attrVal);
    },
    modelUpdater(node,value){
        node.value = value;
    },
    textUpdater(node, value) {
        node.textContent = value;
    },
    htmlUpdater(node,value){
        node.innerHTML = value;
    }
}

