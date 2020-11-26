

class MVUE {
    constructor(options) {
        this._el = options.el
        this._data = options.data
        console.log(getNode(document.querySelector(this._el)))
    }
}

//虚拟Dom
class VNode {
    constructor(tag,value,data,type,children) {
        this.tag = tag;
        this.value = value
        this.data = data;
        this.type = type;
        this.children = []
    }
    appendChild(vnode){
        this.children.push(vnode)
    }
}

function getNode(e) {
    let _vnode ={}
        if(e.nodeType == 3){
            //文本元素
            _vnode = new VNode(null,e.textContent,null,e.nodeType)
        }else if(e.nodeType == 1){
            //标签元素
            let data = {};
            [...e.attributes].forEach(a=>{
                console.dir(a)
                data[a.nodeName] = a.nodeValue
            })
            _vnode = new VNode(e.nodeName,null,data,e.nodeType)
            if(e.childNodes&&e.childNodes.length>0){
                [...e.childNodes].forEach(ee=>{
                    _vnode.appendChild(getNode(ee))
                })
            }
        }
        return _vnode
}
