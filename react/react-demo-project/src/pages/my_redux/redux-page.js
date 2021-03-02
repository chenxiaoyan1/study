import {Component} from "react";
import store from "./store";

class MyReduxPage extends Component{
    componentDidMount() {
        store.subscribe(()=>{
            var a = store.getState()
            this.forceUpdate()
        })
    }

    add=()=>{
        store.dispatch({type:"ADD"})
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

export default MyReduxPage