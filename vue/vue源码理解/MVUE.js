class MVUE {
    constructor(options) {
        this._el = options.el
        this._data = options.data
        let vnode = getVNode(document.querySelector(this._el))
        console.log(vnode)
        let node = getNode(vnode)
        console.log(node)
    }
}

class VNode{
    constructor(tag,data,value,type) {
        this.tag = tag
        this.data = data
        this.value = value
        this.type = type
        this.children = []
    }
    appendChild(vnode){
        this.children.push(vnode)
    }
}
/**生成虚拟DOM*/
function getVNode(node) {
    let _vnode = {}
    if(node.nodeType == 1){
        //标签元素
        let data = {};
        [...node.attributes].forEach(a=>{
            data[a.nodeName]=a.nodeValue
        })
        _vnode = new VNode(node.nodeName,data,null,node.nodeType)
        if(node.childNodes&& node.childNodes.length){
            [...node.childNodes].forEach(n=>{
                _vnode.appendChild(getVNode(n))
            })
        }
    }else if(node.nodeType == 3){
        //文本元素
        _vnode = new VNode(null,null,node.nodeValue,node.nodeType)
    }
    return _vnode
}

/**生成真实DOM*/
function getNode(vnode) {
    let node
    if (vnode.type == 1) {
        //标签元素
        node =  document.createElement(vnode.tag)
        //添加属性
        Object.keys(vnode.data).forEach(k=>{
            let attrNode = document.createAttribute(k)
            attrNode.value = vnode.data[k]
            node.setAttributeNode(attrNode)
        })
        //添加子节点
        if(vnode.children && vnode.children.length){
            vnode.children.forEach(e=>{
                node.appendChild(getNode(e))
            })
        }
    } else if (vnode.type == 3) {
        //文本元素
       node =  document.createTextNode(vnode.value)
    }
    return node
}