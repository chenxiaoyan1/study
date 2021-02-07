import {Component} from "react";
import ThemeContext from "./context";
import userContext from "./userContext";
//class方式组件用static contextType = ThemeContext方式接收context
// class Child extends Component{
//     static contextType = ThemeContext
//     static userContext = userContext
//     render(){
//         return (
//             <div className="child">
//                 {/*<span>{this.context}</span>*/}
//                 {console.log(this.context)}
//
//             </div>
//         )
//     }
// }

//函数式组件用Context.Consumer方式接收context
function Child() {
    return (
        <div className="child">
            <ThemeContext.Consumer>
                {value=>(
                    <userContext.Consumer>
                    {c=>console.log(c,value)}
                    </userContext.Consumer>
                )}
            </ThemeContext.Consumer>
        </div>
    )
}

export default Child