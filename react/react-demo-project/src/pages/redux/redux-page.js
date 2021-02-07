import {Component} from "react";
import store from "./store";

class ReduxPage extends Component{
    componentDidMount(): void {
        store.subscribe(()=>{
            this.forceUpdate()
        })
    }

    add=()=>{
        store.dispatch(dispatch=>{
                setTimeout(function(){dispatch({type:"ADD"})},1000)
        })
    }
    minus=()=>{
        store.dispatch({type:"MINUS",value:1})
    }
    render(){
        return (
            <div>
                <h4>{store.getState()}</h4>
                <button onClick={this.add}>add</button>
                <button onClick={this.minus}>minus</button>
            </div>
        )
    }
}

export default ReduxPage