import InputCom from "../../components/input";
// import {Component} from "react"

//返回组件是class写法
// function hoc(Com) {
//     return (
//         class newCom extends Component{
//             render() {
//                 console.log(this)
//                 return (
//                     <div className="green_border">
//                         <Com {...this.props}></Com>
//                     </div>
//                 )
//             }
//         }
//     )
// }

// //返回组件是function写法
// function hoc(Com) {
//  return (
//      function (props) {
//         return (
//             <div className="green_border">
//                 <Com {...props}></Com>
//             </div>
//         )
//      }
//  )
// }
//箭头函数写法
var hoc = Com=> props=>{
            return (
                <div className="green_border">
                    <Com {...props}></Com>
                </div>
            )
        }
export default hoc
