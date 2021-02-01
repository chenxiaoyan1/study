import {Component} from "react";

function create(Com){

    return (
        class newCom extends Component{
            constructor() {
                super();
                this.state={"name":123456}
            }
            getFieldValue=(field)=>{
                console.log(field)
            }
            //也是一个高阶组件
            getFieldDecorator=(field,options)=>{
                debugger
                return (
                    // function newFieldDecorator(Com) {
                    //     return (
                            function (props) {
                                return <Com {...props} ></Com>
                            }
                        // )
                    // }
                )
            }
            getFieldsValue=()=>{

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