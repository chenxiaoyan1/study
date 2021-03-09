# react

## HOC 高阶组件
- 参数为组件，返回为一个新组件的函数
```js
//返回组件是class写法
function hoc(Com) {
    return (
        class newCom extends Component{
            render() {
                console.log(this)
                return (
                    <div className="green_border">
                        <Com {...this.props}></Com>
                    </div>
                )
            }
        }
    )
}

//返回组件是function写法
function hoc(Com) {
 return (
     function (props) {
        return (
            <div className="green_border">
                <Com {...props}></Com>
            </div>
        )
     }
 )
}
//箭头函数写法
var hoc = Com=> props=>{
            return (
                <div className="green_border">
                    <Com {...props}></Com>
                </div>
            )
        }


//高阶组件
var hocPage = hoc(InputCom)

```

## 生命周期函数
[react生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- 生命周期函数解释
更新阶段：当组件的props改变了，或组件内部调用了setState或者forceUpdate发生，会发生多次
### getDerivedStateFromProps
```js
static getDerivedStateFromProps(props,state){}
```
> 是一个静态函数，不能使用this;这里props和state都是最新的
>该函数会在挂载时，在更新时接收到新的 props，调用了 setState 和 forceUpdate 时被调用
>函数会返回一个对象用来更新当前的 state，如果不需要更新可以返回 null,如果不返回null,则会将
        返回的对象和现有的state合并

### render
>    //! render函数应该是一个纯函数，就是返回需要渲染的东西，不应该包含其他业务逻辑，如数据
          // ! 请求，对于这些业务逻辑，移到componentDidMount和componentDidUpdate中

### componentDidMount
>  //! componentDidMount 会在组件挂载后调用，此时可以获得DOM节点并操作,在此生命周期中可以请求数据，添加订阅
         // ! 在componentDidMount 中调用setState会触发更新操作，多调用一次render，但是用户不会看到
         // ! 中间状态，因为此次渲染发生在屏幕刷新前，但避免此操作，有性能问题
### shouldComponentUpdate
>  // !shouldComponentUpdate(nextProps, nextState) 有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true
         // ! 默认返回true,有时候会有性能问题，要将this.props与nextProps以及this.state与nextState进行比较来决定是否返回false，来减少重新渲染

### getSnapshotBeforeUpdate
>    /**
           * ! getSnapshotBeforeUpdate(prevProps, prevState)
           * ! 有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，
           * ! 如果你不想要返回值，请返回null，不写的话控制台会有警告
           */
### componentDidUpdate
>  ! componentDidUpdate(prevProps, prevState, snapshot) 有三个参数prevProps，prevState，snapshot，
          * ! 表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的
          * ! 在这个函数里我们可以操作DOM，和发起服务器请求，还可以setState，但是注意一定要用if语句控制，否则会导致无限循环

### componentWillUnMount
>  ! 当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作
>   ! 注意不要在这个函数里去调用setState，因为组件不会重新渲染了


## 合成事件
- 什么是合成事件
React基于虚拟DOM实现了一个合成事件层，使用事件委托方式将所有事件都自动绑定在最外层上
- 合成事件的好处
1.进行浏览器兼容，实现更好的跨平台
React 采用的是顶层事件代理机制，能够保证冒泡一致性，可以跨浏览器执行。React 提供的合成事件用来抹平不同浏览器事件对象之间的差异，将不同平台事件模拟合成事件。

2.避免垃圾回收
事件对象可能会被频繁创建和回收，因此 React 引入事件池，在事件池中获取或释放事件对象。即 React 事件对象不会被释放掉，而是存放进一个数组中，当事件触发，就从这个数组中弹出，避免频繁地去创建和销毁(垃圾回收)。

3.方便事件统一管理和事务机制


- 合成事件和原生事件的区别
1.事件名称命名方式不同
合成事件是采用小驼峰式 onClick
原生事件是全部小写 onclick
2.事件处理函数写法不同
  原生事件中事件处理函数为字符串，在 React JSX 语法中，传入一个函数作为事件处理函数。
3.原生事件一定要在componentWillUnmount中手动移除，否则可能出现内存泄露问题

- 合成事件和原生时间的执行顺序
先执行原生事件，再执行react事件


## setState
- setState是同步还是异步
在setTimeout，原生事件中是同步的，在合成事件，生命周期中是异步的

## 装饰器
上面的高阶组件可以用装饰器
装饰器只能用在clss定义的组件上
```js

import {Component} from "react"
import hoc from "../pages/hoc_demo/hoc_demo"

@hoc
class InputCom extends Component{
    render() {
        console.log(this)
        return (
            <input type="text" placeholder="请输入文字" {...this.props}/>
        )
    }
}
export default InputCom
```
- 装饰器配置
```shell script

npm install -D @babel/plugin-proposal-decorators
```
```json
//pacgage.json
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ]
  },
```

## portal 传送门
> 作用：当想把父组件的某个子组件渲染到页面中其他盒子（非父组件子树）里的时候，就用poral,参考DialogPortal.js
>虽然这个弹窗组件在某个组件中使用，但是最后在html中是渲染在body下的，不是渲染在组件中
```js
import {Component} from "react";
import {createPortal} from "react-dom"

class DialogPortal extends Component{
    constructor() {
        super();
        this.el =  document.createElement("div")
    }
    componentDidMount(): void {
        document.body.append(this.el)
    }
    componentWillUnmount(): void {
        document.body.removeChild(this.el)
    }
    render(){
        let {header,content,footer} = this.props.children
        return createPortal((
            <div className="dialog">
                <div className="dialog-header">
                    {header}
                </div>
                <div className="dialog-content">
                    {content}
                </div>
                <div className="dialog-footer">
                    {footer}
                </div>
            </div>
        ),this.el)
    }
}
export default DialogPortal
```

## refs
> refs提供一种方式，允许访问DOM节点或在render中方法中创建的React元素
- React.createRef()  
原生的DOM标签或class方式声明的组件,不适用于function方式定义的组件
- React.forwardRef 函数式组件
- hook方式
- 回调函数方式
具体使用方法见src/pages/test/refs-demo.js

## 有用的react链接
https://processon.com/view/link/5dd68342e4b001fa2e0c4697#map--react源码文件指引

https://react.jokcy.me/book/api/react-children.html#--源码解析

https://www.cnblogs.com/dhui/p/12982452.html --原型，原型链，以及看看他的其他文章

## context
> context提供了一个无需为每层组件手动添加props， 就能在组件树间进行数据传递的方法
> 实现祖代向后代组件跨层级传值，vue中provide/inject来源于context
> 使用contetx步骤
>
>  1. 创建 createContext
>  2. Proiver接收value，以保证有传下去的数据
>  3. 接收 Consumer或者class.contextType
### context api
#### React.createContext
```js
const MyContext = React.createContext(defaultValue);
```
> 创建一个context 对象，当react订阅这个context对象的组件，这个组件就会从组件树中离自身最近的那个
>匹配的Provider中读取当前的context值
>只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效
#### Context.Provider
```js
<MyContext.Provider value={/* 某个值 */}>
<Parent />
</MyContext.Provider>
```
>当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染
> parent及其子组件可以获得context（前提是接收了）
> 当value的值是一个对象的时候，不要这样写value={{name:"tom"}}因为每次都是新对象，即使数据没有变化也会渲染，
>造成性能问题，将对象放在state中，value={this.state.nameObj}
#### Class.contextType
> class方式组件接收context的方式
```js
//child.js
class MyClass extends React.Component {
     static contextType = ThemeContext
       render(){
         return (<div>{console.log(this.context)}</div>)
}
}
```
#### Context.Consumer
> function 方式组件接收context的方式
```js
//child.js
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```
## Redux
> Redux 是JavaScript应用的状态容器，他保证程序行为一致性且易于测试
> 1. 需要⼀一个store来存储数据
> 2. store里的reducer初始化state并定义state修改规则 
> 3. 通过dispatch一个action来提交对数据的修改
> 4. action提交到reducer函数⾥，根据传入的action的type， 返回新的state
> 5. subscribe监听数据的变化
> 注意：
>reducer是一个纯函数，不要在reducer中做一下操作
> 1）修改传入参数
> 2)执行有副作用的操作，例如api请求和路由跳转
>3）调用非纯函数 例如Date.now()或Math.rendom()
- 安装
```shell
npm install redux --save
```
- 使用
见study/react/react-demo-project/src/pages/redux/store.js
见study/react/react-demo-project/src/pages/redux/redux-page.js

## redux-logger redux-thunk
> Redux 默认只支持同步，实现异步需要中间件的支持，例如redux-logger 和redux-thunk
> 中间件就是一个函数，对store.dispatch进行改造，在发出action和执行reducer这两步之间，
>添加了其他功能
- 安装
```shell script
npm install redux-logger redux-thunk --save
```
- 使用
```js
import {createStore,applyMiddleware} from "redux";
import logger from "redux-logger"
import thunk from "redux-thunk"

 const store = createStore(reducer,applyMiddleware(logger,thunk))

//组件中
 store.dispatch(dispatch=>{
     setTimeout(function(){dispatch({type:"ADD"})},1000)
        })
```
## react-redux
>react-redux 提供两个api
> - Provider 为后代组件提供store
> - connect 连接组件和redux store，使组件获得数据以及修改数据的方法 

- 安装
```shell script
npm install react-redux --save
```

- 使用
```js
//store.js
import {createStore} from "redux";

function reducer(state = {count:0},action) {
    //console.log(state)
    switch (action.type) {
        case "ADD":
            var copyState = JSON.parse(JSON.stringify(state))
            copyState.count++
            return copyState;
        case "MINUS":
            var copyState = JSON.parse(JSON.stringify(state))
            copyState.count--
            return copyState;
        default:
            return state

    }
}

export default createStore(reducer)
```
```js
//父组件，利用provider传递store
 <Provider store={store}>
           
            <ReactReduxPage></ReactReduxPage>
        </Provider>
```
```js
//要使用store的组件
import React from "react";
import {bindActionCreators} from "redux"
import {connect} from "react-redux"


class ReactReduxPage extends React.Component{

    render() {
        console.log("react-redux-props",this.props)
        const {state,dispatch,add,minus}  = this.props
        return (
            <div className="react-redux">
                <h4>{state.count}</h4>
                <button onClick={()=>dispatch({type:"ADD"})}>add use dispatch</button>
                <button onClick={()=>add()}>add</button>
                <button onClick={()=>minus()}>minus</button>
            </div>
        )
    }
}

// ! mapStateToProps 函数
// ! ownProps 不必填 代表组件本身的props，如果不传，在组件中也会获得，这里传的化假如下面state需要此props ，可以获得
// ! 当此参数写上的时候，当组件本身props每次变化的时候，mapStateToProps每次都执行,
// ! 不传此参数的时候，组件本身props每次变化时，mapStateToProps这个函数不会执行
// ! 因此ownProps谨慎使用，如果mapStateToProps有复杂计算时，会影响性能
let  mapStateToProps = (state,ownProps)=>{
   // console.log("state",state,"ownProps",ownProps)
    return {
        state:state
    }
}

// ! mapDispatchToProps 可以是函数也可以是对象
// ! 如果不指定mapDispatchToProps，默认props会注入dispatch本身,指定了mapDispatchToProps，就不会注入dispatch 具体注入什么就看怎么写的了
//! 如果是一个对象
//!
//!

// * mapDispatchToProps是对象的形式
// let mapDispatchToProps = {
//     add: () => ({type: "ADD"})
// }


//! ownProps 不必填 代表组件本身的props，如果不传，在组件中也会获得，这里传的化假如下面state需要此props ，可以获得
// ! 当此参数写上的时候，当组件本身props每次变化的时候，mapDispatchToProps每次都执行,
// ! 不传此参数的时候，组件本身props每次变化时，mapDispatchToProps这个函数不会执行
// ! 因此ownProps谨慎使用，如果mapDispatchToProps有复杂计算时，会影响性能
//* mapDispatchToProps是函数的形式
// let mapDispatchToProps = (dispatch,ownProps)=>{
let mapDispatchToProps = (dispatch)=>{
    //console.log("mapDispatchToProps")
    const res = {
        minus:()=>({type:"MINUS"})
    }
    //bindActionCreators将上面的minus:()=>({type:"MINUS"})变成minus:()=>dispatch({type:"MINUS"})
    let a = bindActionCreators(res,dispatch)
    return {
        dispatch,
        ...a
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(ReactReduxPage)

```

## react-router
> react-router包含3个库：react-router,react-router-dom(浏览器中使用),react-router-native(rn中使用)
>react-router提供最基本的路由功能，不直接安装，安装react-router-dom或react-router-native时会自动安装

- 安装
```shell script
npm install --save react-router-dom
```
- 使用
> Route 渲染内容有3种方式，优先级children>component>render 3者只能用一个





- 动态路由
定义路由:
```js
<Route path="/search/:id" component={Search} />

<Link to={"/search/" + searchId}>搜索</Link>


//获取参数
this.props.match.params.id
```

添加导航链接:
创建Search组件并获取参数:


## 异步组件（懒加载）
>React.Lazy帮助我们按需加载组件，从而减少我们应用程序的加载时间，因为只加载我们所需的组件。
> React.lazy接受一个函数，这个函数内部调用 import() 动态导入。它必须返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件。
> React.Suspense 用于包装延迟组件以在加载组件时显示后备内容。
```js
import React, { Component,lazy, Suspense } from 'react'

const AppTitle  = lazy(()=>import(/* webpackChunkName: "title" */'./AppTitle'))

render(){
	return (
		 <Suspense fallback={<Loading/>}>
         <AppTitle/>
     </Suspense>
	)
}
```
## 错误边界
两种方式处理错误生命周期 componentDidCatch 来处理错误，
 还有一种 是 静态方法 static getDerivedStateFromError 来处理错误
定义一个错误标识，在render时如果错误标识为真则渲染备用组件，为假则渲染真实组件

## PureComponent
当一个组件的props或state变更，React 会将最新返回的元素与之前渲染的元素进行对比，以此决定是否有必要更新真实的 DOM，当它们不相同时 React 会更新该 DOM。
如果渲染的组件非常多时可以通过覆盖生命周期方法 shouldComponentUpdate 来进行优化
shouldComponentUpdate 方法会在重新渲染前被触发。其默认实现是返回 true,如果组件不需要更新，可以在shouldComponentUpdate中返回 false 来跳过整个渲染过程。其包括该组件的 render 调用以及之后的操作
PureComponent通过prop和state的浅比较来实现shouldComponentUpdate

class组件可以通过继承PureComponent来优化
function组件可以通过React.memo来优化
```js
 const Title2 = React.memo(props=>{
     console.log('Title2 render');
     return  <p>{props.title}</p>;
 });
 ! memo的实现，实质就是高阶组件，里面返回的组件继承PureComponent
function memo(Com){
    return class extends PureComponent{
        render(){
            return <Com {...this.props}></Com>
        }
    }
}
```
## setState
- setState(object|function,callback)
- react的setState是同步的还是异步的
> 有时候是同步的，有时候是异步的
> setState在合成事件和生命周期中是异步的，这里说的异步其实是批量更新，达到优化性能的目的
> setState在setTimeout和原生事件中是同步的
- setState的更新可能会被合并
> 想要他不合并，使用函数方式
> this.setState(state=>{
> return {
> counter:state.counter
> }
> })

# react 和 vue的异同
## 插槽写法
- react写法 组件复合 layout.js main.js


- vue 写法 slot



# 其他知识
## 对象-原型-原型链
// !https://www.cnblogs.com/dhui/p/12982452.html -对象，原型，原型链
// 直接挂在静态函数上的变量属于静态成员（私有属性）
//! 静态成员只能通过构造函数访问，实例对象不能访问
//! 实例成员只能通过实例对象访问，构造函数不能访问
//! 一般公共方法定义在原型对象上，原型的作用是共享方法
//!对象的__proto__和构造函数的prototype指向的是一个对象，prototype的constructor指向构造函数
## Promise
```js
// promise
//! Promise一般来讲是一个对象，.then方法是promise对象对一个方法

/**
 * Promise构造函数接收一个函数A作为参数，函数A有2个参数，resolve和reject，
 * 调用resolve这个函数，标记为成功，调用reject这个函数，标记为失败；
 * resolve和reject在调用时，可以传递数据，这个数据会被传递给成功或失败的回调函数中
 * 在这个函数A中可以执行异步操作，在这个函数中执行完成异步操作之前，
 * 并不是调用用户提供的回调函数（不关心回调到底是什么），而是在这个函数中，异步操作完成后
 * 修改当前promise的状态
 *
 */

/**
 * Promise的状态
 * pendding:挂起，当前promise正在执行任务
 * fullfilled:完成任务，成功状态
 * rejected：完成任务，失败状态
 * */

/**
 * Promise对象的.then方法接收的成功的回调函数会在promise对象处于成功(fullfilled)状态下自动执行
 * Promise对象的.then方法接收到的失败的回调函数会promise对象处于失败(rejected)状态下自动执行
 * then方法的返回值有两种：
 * 1、promise对象：
 * 调用下一个then
 * 2、普通值：
 * 将该普通值传递给下一个then,作为then中回调函数的参数
 * */
var p =new Promise(function (resolve,reject) {
    setTimeout(function () {
        //!resolve将promise的状态置为成功fullfielled
        resolve("data12")
    },1000)
})

p.then(function (data) {
    //!data为resolve函数传递的数据
    //! 成功回调，会在promise的状态变为fullfilled成功时自动执行
    console.log("成功回调")
    console.log(data)//data12
    return data
},function (err) {
    //! err为reject函数传递的数据
    //!失败回调，会在promise的状态变为rejected失败时自动执行
    console.log("失败回调")
    console.log(err)
})
    .then(function (data2) {
        console.log(data2)
        return data2
    })
    .then(function (data3) {
        console.log(data3)
    })


//* 写法1
p.then(function (data) {
    console.log("成功的回调")
},function (err) {
    console.log("失败的回调")
})
//* 写法2
p.then(function (data) {
    console.log("成功的回调")
})
    .catch(function () {
    console.log("失败的回调")
})
//* 写法1和写法2是效果一样的，不过写法2在出现代码异常的时候不会报错卡死，而是进入catch中


```