import {BrowserRouter as Router,Link,Route,Switch} from "react-router-dom"
import {Component} from "react";
import {connect} from "react-redux"
import IndexPage from "./indexPage";
import UserPage from "./userPage";
import LoginPage from "./loginPage";
import PrivatePage from "./privatePage";



class ReactRputerPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            count:0
        }
    }
    handleClick=()=>{
        this.setState({
            count:this.state.count+1
        })
    }
    handleLogout=()=>{
        this.props.logout()
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>add </button>
                <button onClick={this.handleLogout}>登出</button>
                <Router>
                    <Link to="/">首页</Link>
                    <Link to="/user/123">用户中心</Link>
                    <Link to="/userCenter">用户中心2</Link>
                    <Link to="/login">登陆</Link>

                    <Route exact path="/" component={IndexPage}></Route>
                    {/*<Route path="/user/:id" component={UserPage}></Route>*/}
                    <Route path="/user/:id" component={PrivatePage}></Route>
                    <Route path="/userCenter" component={UserPage}></Route>

                    <Route path="/login" component={LoginPage}></Route>


                    {/*<Switch>*/}
                    {/*    <Route exact path="/"*/}
                    {/*           */}
                    {/*           children={()=><IndexPage count={this.state.count}></IndexPage>}*/}
                    {/*    ></Route>*/}
                        {/*
                        ! 正确的案例
                        */}
                        {/*<Route path="/user"*/}
                        {/*       // component={UserPage}*/}
                        {/*       render={()=><UserPage count={this.state.count}></UserPage>}*/}
                        {/*></Route>*/}
                        {/*
                         ! 错误案例，每次count变化，LoginPage都会重新卸载加载，渲染component的时候会调⽤用 React.createElement，
                         ! 如果使⽤用下⾯这种匿名函数的形 式，每次都会⽣成⼀个新的匿匿名的函数，
                         ! 导致⽣成的组件的type总是不相同，这个时候会 产生重复的卸载和挂载
                         */}
                    {/*    <Route path="/login"*/}
                    {/*           component={()=><LoginPage count={this.state.count}></LoginPage>}*/}
                    {/*    ></Route>*/}
                    {/*    <Route render={()=><div>404</div>}></Route>*/}
                    {/*</Switch>*/}
                </Router>
            </div>
        )
    }
}
let mapDispatchToProps = {
    "logout":()=>({type:"LOGOUT"})
}

// ! 当⽤到内联函数的内联渲染时，请使⽤用render或者children,使用component 使用内联函数时每次render都会创建一个新组件，他不会更新现有组件，而是会直接卸载然后再去挂载一个新组件
export default connect(null,mapDispatchToProps)(ReactRputerPage)