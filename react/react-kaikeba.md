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
```





# react 和 vue的异同
## 插槽写法
- react写法 组件复合 layout.js main.js


- vue 写法 slot