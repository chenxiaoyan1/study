import React,{Component} from "react";

class Child extends Component{
    constructor(props) {
        super(props);
        this.state={
            val:""
        }
        this.inputRef = React.createRef()
    }
    add = ()=>{
        //! ref方式获得input的值
        // this.props.getData(this.inputRef.current.value)
        //! 受控组件方式获得input的值
        this.props.getData(this.state.val)
    }
    changeVal = (e)=>{
        this.setState({val:e.target.value})
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    // defaultValue="default"
                    //    ref = {this.inputRef}
                       value={this.state.val}
                       onChange={this.changeVal}
                />
                <button onClick={this.add}>add</button>
            </div>
        );
    }
}

export default Child

