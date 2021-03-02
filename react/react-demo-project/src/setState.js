import React,{Component} from "react";

class SetStateTest extends Component{
    constructor(props) {
        super(props);
        this.state={count:0}
    }
    componentDidMount(): void {
        // ? setState在这里是异步的
        console.log("setState之前",this.state.count)
        // this.setState({count:this.state.count+1})
        this.setState((state)=>{return {count:state.count+1}})
        console.log("setState之后",this.state.count)


        setTimeout( ()=> {
            // ? setState在这里是同步的
            console.log("setState之前",this.state.count)
            this.setState({count:this.state.count+1})
            // this.setState((state)=>{return {count:state.count+1}})
            console.log("setState之后",this.state.count)
        },3000)
    }
    handleClick = ()=>{
        // ? setState在这里是异步的
        console.log("setState之前",this.state.count)
        // this.setState({count:this.state.count+1})
        this.setState((state)=>{return {count:state.count+1}})
        console.log("setState之后",this.state.count)
    }
    incrementCount() {
        this.setState({
            count: this.state.count + 1,
        });
    }

    handleIncrement = () => {
        this.incrementCount();
        this.incrementCount();
        this.incrementCount();
    }
    render() {
        console.log("render",this.state.count)
        return (
            <div>
                <button id="but" onClick={this.handleIncrement}>click</button>
                setState--{this.state.count}
            </div>
        );
    }
}

export default SetStateTest