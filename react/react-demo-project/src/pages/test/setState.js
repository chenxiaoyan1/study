import React,{Component} from "react";
import Child from "./child";

class SetStateTest extends Component{
    constructor(props) {
        super(props);
        this.state = {
            count:0
        }
    }
    handleClick = ()=>{
        console.log("setState之前1",this.state.count)
        this.setState({count:this.state.count+1})
        console.log("setState之后1",this.state.count)
        console.log("setState之前2",this.state.count)
        this.setState({count:this.state.count+1})
        console.log("setState之后2",this.state.count)

        setTimeout( ()=> {
            console.log("setTimeout",this.state.count)//1
            // console.log(this)
            this.setState({count:this.state.count+1})//2
            console.log(this.state.count)
        },0)

    }

    handleClick2 = ()=>{
        console.log("setState之前1",this.state.count)
        this.setState(state=>{return {count:state.count+1}})
        console.log("setState之后1",this.state.count)
        console.log("setState之前2",this.state.count)
        this.setState(state=>{return {count:state.count+1}})
        console.log("setState之后2",this.state.count)

    }
    render() {
        console.log("render",this.state.count)
        return (
            <div>
                <h3>{this.state.count}</h3>
                <button onClick={this.handleClick}>click--setState({})</button>
                <button onClick={this.handleClick2}>click--setState(fn)</button>
                <Child></Child>
            </div>
        )
    }
}

export default SetStateTest