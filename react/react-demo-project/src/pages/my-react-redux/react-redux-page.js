import React from "react";
import {bindActionCreators} from "redux"
// import {connect} from "./react-redux"
import {connect} from "./react-redux"


class KReactReduxPage extends React.Component{
    render() {
       // console.log("my-react-redux-props",this.props)
        const {state2,dispatch,add,minus}  = this.props

        console.log(this.props)
        return (
            <div className="react-redux">
                <h4>react-redux</h4>
                {/*{console.log(state2)}*/}
                <h4>{state2.count}</h4>
                <button onClick={()=>dispatch({type:"ADD"})}>add use dispatch</button>
                <button onClick={()=>add()}>add</button>
                <button onClick={()=>minus()}>minus</button>
            </div>
        )
    }
}

// ! mapStateToProps 函数
let  mapStateToProps = (state,ownProps)=>{
   // console.log("state",state,"ownProps",ownProps)
    return {
        state2:state
    }
}
// let mapStateToProps = state => ({count: state})
// ! mapDispatchToProps 可以是函数也可以是对象
// * mapDispatchToProps是对象的形式
// let mapDispatchToProps = {
//     add: () => ({type: "ADD"})
// }


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

export default connect(mapStateToProps,mapDispatchToProps)(KReactReduxPage)
// let n = connect(mapStateToProps,mapDispatchToProps)(KReactReduxPage)
// export default n