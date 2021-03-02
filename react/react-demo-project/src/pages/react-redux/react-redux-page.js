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