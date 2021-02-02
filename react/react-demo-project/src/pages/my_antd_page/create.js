import React, {Component} from "react";

function create(Com){
    return (
        class newCom extends Component{
            constructor(props) {
                super(props);
                this.state={}
            }
            getFieldValue=(field)=>{
                return this.state[field]

            }
            change=(e)=>{
                let {value,name} = e.target
                this.setState({[name]:value})
            }
            //
            getFieldDecorator=(field,options)=>{
                return  (Com)=> {
                        return (
                            React.cloneElement(Com,{
                                value:this.state[field] || "",
                                onChange:this.change,
                                name:field
                            })
                        )
                    }
            }
            getFieldsValue=()=>{
                return this.state
            }
            render(){
                return (
                    <Com
                        form={
                            {
                            "getFieldDecorator":this.getFieldDecorator,
                            "getFieldsValue":this.getFieldsValue,
                             "getFieldValue":this.getFieldValue
                            }
                        }
                    ></Com>
                )
            }
        }
    )
}

export default create