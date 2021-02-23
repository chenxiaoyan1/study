import {Component} from "react";
import {Link, Route} from "react-router-dom";
import Detail from "./detail";
import Detail2 from "./detail2";
import privateLogin from "./privatelogin";

class UserPage extends Component{
    componentDidMount() {
        console.log("UserPage componentDidMount")
    }

    componentWillUnmount() {
        console.log("UserPage componentWillUnmount")
    }
    render() {
        console.log(this.props)
        return (
            <div>

                UserPage--{this.props.count}

                <Link to="/userCenter/detail/123">详细</Link>
                <Link to="/userCenter/detail2/123456">详细2</Link>
                <Route path="/userCenter/detail/:id" component={Detail}></Route>
                <Route path="/userCenter/detail2/:id" component={Detail2}></Route>
            </div>
        );
    }
}

export default privateLogin(UserPage)
// export default UserPage