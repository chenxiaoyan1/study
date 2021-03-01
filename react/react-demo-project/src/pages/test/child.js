import React,{Component} from "react";

class Child extends Component{
    constructor(props) {
        super(props);
        this.state={
            count:0
        }
    }
    update=()=>{
        this.setState({count:this.state.count})
    }
    render() {
        console.log("child render")
        return (
            <div>
                child--{this.state.count}
                <button onClick={this.update}>click</button>
            </div>
        );
    }
}

export default Child