import React from "react";
function FunctionCom(props) {
    const showMessage = ()=>{
        console.log(props.user)
    }
    const handleClick = ()=>{
        setTimeout(showMessage,9000)
    }
    return (
        <div>
            <p>"FunctionCom--"+{props.user}</p>
            <button onClick={handleClick}>click</button>
        </div>

    )
}
class ClassCom extends React.Component{
     showMessage = ()=>{
        console.log(this.props.user)
    }
     handleClick = ()=>{
        setTimeout(this.showMessage,9000)
    }
    render(){
         return (
             <div>
                 <p >"classCom"+{this.props.user}</p>
                 <button onClick={this.handleClick}>click</button>
             </div>

             )

    }
}

function Com() {
    var p = {user:"tom"}
    return (
        <div>
            <p>{p.user}</p>
            {/*<FunctionCom user ={p.user}/>*/}
            <ClassCom user = {p.user}/>
        <button onClick={()=>{p.user="jerry"}}>change</button>
        </div>

    )
}
class ClaCom extends React.Component{
    constructor(props) {
        super(props);
        this.state = {user:"tom"}
    }

    render() {
        return (
            <div>
                <p>{this.state.user}</p>
                <FunctionCom user ={this.state.user}/>
                <ClassCom user = {this.state.user}/>
                <button onClick={()=>{this.setState({user:"jerry"})}}>change</button>
            </div>
        );
    }
}

export default ClaCom