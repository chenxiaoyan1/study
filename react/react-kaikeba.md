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

## context
> context提供了一个无需为每层组件手动添加props， 就能在组件树间进行数据传递的方法
>实现祖代向后代组件跨层级传值，vue中provide/inject来源于context
> 使用contetx步骤
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
 
 





# react 和 vue的异同
## 插槽写法
- react写法 组件复合 layout.js main.js


- vue 写法 slot