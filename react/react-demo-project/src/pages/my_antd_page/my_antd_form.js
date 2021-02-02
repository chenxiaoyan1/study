import {Component} from "react";
import create from "./create"

@create
class MyAntdForm extends Component{
    handleSubmit2=(e)=>{
        var { getFieldValue,getFieldsValue} = this.props.form
        console.log(getFieldValue("name"))
        console.log(getFieldsValue())

    }
    render(){
        var { getFieldDecorator} = this.props.form
        return (
            <div className="red_border">
                <form>
                    name:
                    {getFieldDecorator("name",{})(<input type="text"  />)}

                    password:
                    {getFieldDecorator("password",{})(<input type="password" />)}

                    <button type="button" onClick={this.handleSubmit2}>submit</button>
                </form>
            </div>
        )
    }
}

export default MyAntdForm