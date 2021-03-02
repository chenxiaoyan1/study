import {Component} from "react";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"

class LoginPage extends Component{
    componentDidMount() {
        console.log("LoginPage componentDidMount")
    }

    componentWillUnmount() {
        console.log("LoginPage componentWillUnmount")
    }
    handleLogin=()=>{
        this.props.login()
    }

    render() {
        let {location} = this.props
        // ! 给redirect 设置默认值是"/"
        let {redirect="/"} = location.state || {} // * 获得重定向到此页面到原页面地址

        if(this.props.isLogin){
            return <Redirect to={redirect}></Redirect>
        }else{
            return (
                <div>
                    LoginPage
                    <button onClick={this.handleLogin}>登陆</button>
                </div>
            )
        }

    }
}


let  mapStateToProps  = (state)=> {
    return {
        isLogin:state.isLogin
    }
}

let mapDispatchToProps ={
    login:()=>({type:"LOGIN"})
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)