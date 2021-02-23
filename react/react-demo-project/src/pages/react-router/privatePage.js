import {Component} from "react";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import privateLogin from "./privatelogin";

class PrivatePage extends Component{
    render() {
        // let {isLogin,location} = this.props
        // if(isLogin){
        //     return (
        //         <div>
        //             privatePage
        //         </div>
        //     );
        // }else{
        //     // ! 未登陆时重定向到登陆页面，并且登陆后回到原页面
        //     return <Redirect to={{pathname:"/login",state:{redirect:location.pathname}}}></Redirect>
        // }
        return (
            <div>
                private-------------
            </div>
        )
    }
}

let mapStateToProps = (state)=>{
    return {
        isLogin:state.isLogin
    }
}

// export default connect(mapStateToProps)(PrivatePage)
export default privateLogin(PrivatePage)