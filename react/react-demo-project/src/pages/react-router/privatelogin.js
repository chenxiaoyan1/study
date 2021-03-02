import {Component} from "react";
import {connect} from "react-redux"
import {Redirect} from "react-router-dom";

let privateLogin = (Com)=>{
 return connect(mapStateToProps)(class extends Component{
     render() {

         let {isLogin,location} = this.props


         if(isLogin){
             return <Com></Com>
         }else{
             // ! 未登陆时重定向到登陆页面，并且登陆后回到原页面
             return <Redirect to={{pathname:"/login",state:{redirect:location.pathname}}}></Redirect>
         }


     }
 })
}

let mapStateToProps = (state)=>{
    return {
        isLogin:state.isLogin
    }
}
export default privateLogin