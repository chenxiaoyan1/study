import React from "react"
class Demo  extends React.Component{
    constructor() {
        super();
        this.state = {count:1}
    }
    componentDidMount(){
        console.log("componentDidMount",this)
    }
    render() {
        return (
            <div {...this.props}>
                <p>{this.state.count}</p>
                demo
            </div>
        );
    }
}
class Input extends React.Component{
    constructor() {
        super();
        this.inputRef = React.createRef()
    }
    handleClick=()=>{
        this.inputRef.current.focus()
    }
    focus=()=>{
        this.inputRef.current.focus()
    }
    static sayHello(){
        console.log("hello")

    }
    render() {
        return (
            <div>
                <input {...this.props} ref={this.inputRef}/>
                <button onClick={this.handleClick} >获取输入框焦点</button>
            </div>
        );
    }
}
//hoc实现方式1 属性代理
function hoc(Com) {
    return class extends React.Component{
        render() {
            //属性代理方式实现：1）操作props
            const newProps = {type:"hoc"}
            return (
                <Com {...this.props} {...newProps}></Com>
            );
        }
    }
}
//!hoc实现方式2 反向继承
//高阶组件可以在render函数中做非常多的操作，从而控制原组件的渲染输出。只要改变了原组件的渲染，我们都将它称之为一种渲染劫持。
function hoc2(Com) {
    let didMount = Com.prototype.componentDidMount
    return class extends Com {
        //反向继承方式实现：劫持生命周期
        //因为反向继承方式实现的高阶组件返回的新组件是继承于传入组件，所以当新组件定义了同样的方法时，将会覆盖父类（传入组件）的实例方法
        //hoc反向继承方式中，hoc中定义的生命周期会覆盖原来的生命周期,也可以判断一下不覆盖，
        componentDidMount(){
            // 通过这种方式劫持 Com 组件的生命周期
            if(didMount){
                didMount.apply(this)
            }
           console.log("hoc componentDidMount")
            //反向继承方式实现：读取操作原组件的state
            //因为继承的关系，所以这里能够有setState方法
            console.log(this.state)
            this.setState({ count: 2 });
        }

        render() {
            //!render函数内实际上是调用React.creatElement产生的React元素
            const com = super.render()
            const props = Object.assign({},this.props,{type:"hoccc"})
            //渲染劫持
            //React.cloneElement()克隆并返回一个新的React元素，以com为起点
            //反向继承方式实现：渲染劫持，修改render方法输出的组件树，此外属性代理方式也可以通过判断props中某属性来渲染劫持
            let comNew = React.cloneElement(com,props,com.props.children)
            return comNew
        }
    }
}

//属性代理方式实现：2）状态管理，hoc实现非受控组件转变为受控组件
function hocInut(Com){
    return class HocInput extends React.Component{
        constructor() {
            super();
            this.state = {val:''}
            this.inputRef = React.createRef()
        }

        handleChange = (e)=>{
            this.setState({val:e.target.value})
        }
        handleClick = ()=>{

            this.inputRef.current.focus()
        }
        handleClick2=()=>{
            //获得子组件的stastic方法
            Com.sayHello()
        }
        render() {
            const newProps = {
                value:this.state.val,
                onChange:this.handleChange
            }
            return (
                <div>
                    <button onClick={this.handleClick}>获取子组件输入框焦点</button>
                    <button onClick={this.handleClick2}>获取子组件stastic方法</button>
                    <Com {...this.props} {...newProps} ref={this.inputRef}></Com>
                </div>

            );
        }
    }
}
let HocInput = hocInut(Input)


let HocDemo1 = hoc(Demo)
let HocDemo2 = hoc2(Demo)
export {HocDemo1,HocDemo2,HocInput,Demo}
/**
 * hoc的实现方式：
 * 1）属性代理：操作props,通过props实现条件渲染等
 * 2）反向继承：劫持原组件生命周期，读取/操作原组件的state,渲染劫持等
 *
 *属性代理是从“组合”的角度出发，这样有利于从外部去操作 WrappedComponent，可以操作的对象是 props，或者在 WrappedComponent 外面加一些拦截器，控制器等。
 反向继承则是从“继承”的角度出发，是从内部去操作 WrappedComponent，也就是可以操作组件内部的 state ，生命周期，render函数等等。

hoc的使用场景：
 1）页面复用
 2）权限控制
 3）日志记录

 hoc的应用
 1）redux中的connect，其实就是一个HOC，具体原理再看
 *
 * */