import {Component} from "react";

class TitlePane extends Component{
    constructor(props) {
        super(props);
        this.state={
            num:0
        }
        console.log("constructor")
    }
    static getDerivedStateFromProps(props,state){
        console.log("getDerivedStateFromProps",props,state)
        return 1
    }
    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        console.log("shouldComponentUpdate")
        return true;
    }
    getSnapshotBeforeUpdate(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null {
        return "getSnapshotBeforeUpdate"
    }
    componentDidMount(): void {
        console.log("componentDidMount")
    }
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.log("componentDidUpdate")
    }
    componentWillUnmount(): void {
        console.log("componentWillUnmount")
    }
     handleClick=()=>{
         //this.state.num++
         this.setState({num:this.state.num+1})
    }

    render(){
        console.log("render")
        return (
            <div>
                <h1>titlePane--{this.state.num}</h1>
                <button onClick={this.handleClick}>click</button>
            </div>

        )
    }
}
export default TitlePane