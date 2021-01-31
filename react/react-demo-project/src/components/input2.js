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

// function InputCom(props) {
//     console.log(props)
//     return (
//         <input type="text" placeholder="请输入文字" {...props}/>
//     )
// }
export default InputCom