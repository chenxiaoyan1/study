import React from "react";
class DialogTest extends React.Component{
    constructor() {
        super();
        this.state={show:false}
    }
    componentDidMount(){
        document.addEventListener("click", ()=> {
            this.setState({show:false})
        })
    }
    handleClick=(e)=>{
        this.setState({show:true})
        console.log(e)
        // e.stopImmediatePropagation()
        e.stopPropagation()
        //! stopPropagation 和stopImmediatePropagation都是阻止冒泡
        //!不过stopImmediatePropagation不但可以组织向上冒泡还可以阻止后续的本级监听执行，而stopPropagation不能阻止本级的监听函数执行
        //在react16中得用stopImmediatePropagation 因为react事件是冒泡到document上，使用stopPropagation不能阻止componentDidMount中的本级监听事件
        //在react17中，两者皆可用，因为17中react事件是冒泡到根容器上
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>显示</button>
                {this.state.show&&<p>dialog</p>}
            </div>
        );
    }

}
export default DialogTest