import React from "react";

class EventCom2 extends React.Component{
    constructor() {
        super();
        this.parentRef =React.createRef()
        this.childRef =React.createRef()
    }
    componentDidMount(){

        this.parentRef.current.addEventListener("click",function(){
            console.log("父元素原生捕获")
        },true)
        this.parentRef.current.addEventListener("click",function(){
            console.log("父元素原生冒泡")
        })
        this.childRef.current.addEventListener("click",function(){
            console.log("子元素原生捕获")
        },true)
        this.childRef.current.addEventListener("click",function(){
            console.log("子元素原生冒泡")
        })
        document.addEventListener("click",function(){
            console.log("document原生捕获")
        },true)
        document.addEventListener("click",function(){
            console.log("document原生冒泡")
        })

    }
    parentClick = ()=>{
        console.log("父元素React事件冒泡")
    }
    childClick = ()=>{
        console.log("子元素React事件冒泡")
    }
    parentCapture = ()=>{
        console.log("父元素React事件捕获")
    }
    childCapture = ()=>{
        console.log("子元素React事件捕获")
    }
    render() {
        return (
            <div ref={this.parentRef} onClick={this.parentClick} onClickCapture={this.parentCapture}>
                <p ref={this.childRef} onClick={this.childClick} onClickCapture={this.childCapture}>
                    事件执行顺序
                </p>
            </div>
        );
    }
}

export default EventCom2