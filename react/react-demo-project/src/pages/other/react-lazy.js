import React, { Component,lazy, Suspense } from 'react'
import ReactDOM from 'react-dom';
import Loading from './loading';
const AppTitle  = lazy(()=>import(/* webpackChunkName: "title" */'./AppTitle'))

class ReactLazy extends Component{

    state = {visible:false,isError:false}
    show = ()=>{
        this.setState({visible:true});
    }
    static getDerivedStateFromError(err){
         return { isError: true };
    }
    componentDidCatch(err,info){
        console.log(err)
    }
    render() {
            if(this.state.isError){
                return <>error</>
            }else{
            return  <>
                         {this.state.visible&&(
                             <Suspense fallback={<Loading/>}>
                                <AppTitle/>
                             </Suspense>
                         )}
                         <button onClick={this.show}>加载</button>
                        </>

        }


    }
}

//! React.Lazy帮助我们按需加载组件，从而减少我们应用程序的加载时间，因为只加载我们所需的组件。
//! React.lazy接受一个函数，这个函数内部调用 import() 动态导入。它必须返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件。
//! React.Suspense 用于包装延迟组件以在加载组件时显示后备内容。


// !错误边界
// 两种方式处理错误生命周期 componentDidCatch 来处理错误，
// 还有一种 是 静态方法 static getDerivedStateFromError 来处理错误
//定义一个错误标识，在render时如果错误标识为真则渲染备用组件，为假则渲染真实组件

export default ReactLazy

