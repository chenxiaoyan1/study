import React,{Component} from "react"
import Child from "./child";

class ParentCom extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list:[
                {
                    id:1,
                    title:"title-1"
                },
                {
                    id:2,
                    title:"title-2"
                }
            ]
        }
    }
    getChildData = (title)=>{
        console.log(title)
        this.setState({
            list:this.state.list.concat([{id:this.state.list.length+1,title}])
        })
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.list.map(l=>{
                        return <li key={l.id}>{l.title}</li>
                    })}
                </ul>
                <Child getData = {this.getChildData}></Child>
            </div>
        );
    }
}

export default ParentCom