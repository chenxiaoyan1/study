import {Component} from "react";
import create from "./create"
import Input from "./input";

@create
class MyAntdForm extends Component{
    handleSubmit2=(e)=>{
        var { getFieldValue} = this.props.form
        getFieldValue("name")
        console.log("submit")
    }
    render(){
        var { getFieldDecorator} = this.props.form
        return (
            <div className="red_border">
                <form>
                    name:{getFieldDecorator("name",{})(Input)}
                    password:<input type="password" />
                    <button type="button" onClick={this.handleSubmit2}>submit</button>
                </form>
            </div>
        )
    }
}

export default MyAntdForm