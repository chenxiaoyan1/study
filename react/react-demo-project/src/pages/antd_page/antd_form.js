import { Form, Input, Button, Checkbox } from 'antd';
import {Component} from "react"

@Form.create()
class AntdForm extends Component {
    handleSubmit=()=>{
        var {getFieldsValue,getFieldValue} = this.props.form
        console.log(getFieldsValue())
        console.log(getFieldValue("name"))

    }
    render(){
        console.log(this)
        var {getFieldDecorator}  = this.props.form
        return (
            <Form>
                <Form.Item label="name">
                    {
                        getFieldDecorator('name', {})(
                        <Input
                           type="text"
                            placeholder="Username"
                        />,
                    )
                    }
                </Form.Item>
                <Form.Item label="password">
                    {getFieldDecorator('password', {
                    })(
                        <Input
                            type="password"
                            placeholder="password"
                        />,
                    )}
                </Form.Item>
                <Form.Item >
                   <button type="submit" onClick={this.handleSubmit}>submit</button>
                </Form.Item>
            </Form>
        )
    }
};

export default AntdForm