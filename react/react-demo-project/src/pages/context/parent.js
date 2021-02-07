import {Component} from "react";
import Child from "./child";
import themeContext from "./context";

class Parent extends Component{
    constructor() {
        super();
        this.state = {
            name:{"age":12}
        }
    }
    static contextType =themeContext
    render(){
        console.log("parent")
        return (
            <div className="parent">
                {/*<span>{this.context}</span>*/}
                <Child></Child>
            </div>
        )
    }
}

export default Parent