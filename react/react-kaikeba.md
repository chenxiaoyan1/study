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
# react 和 vue的异同
## 插槽写法
- react写法 组件复合 layout.js main.js


- vue 写法 slot