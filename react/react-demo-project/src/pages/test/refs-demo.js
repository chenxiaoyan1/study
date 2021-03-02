import React,{Component,useRef} from "react";


class RefsDemo extends Component{
    constructor(props) {
        super(props);
        this.state={
            count:1
        }
        this.nameRef = React.createRef()
        this.ageRef = React.createRef()
        this.hobbyRef = React.createRef()

        this.nameRef2 = null

    }
    handleSave = ()=>{
        // ! 在普通标签上用React.createRef()方式获得
        console.log("name值：",this.nameRef.current.value)
        // ! class组件上使用ref
        console.log("age值：",this.ageRef.current.getInputRef().current.value)
        // ! function定义的组件上使用ref
        console.log("hobby值：",this.hobbyRef.current.value)
        // ! 回调函数的方式使用ref
        console.log("study值：",this.nameRef2.value)
    }
    handleNameRef = (ele)=>{
        console.log("handleNameRef",ele)
        this.nameRef2 = ele
    }
    add = ()=>{
        this.setState({count:this.state.count+1})
    }
    render() {
        const FunComRef= React.forwardRef(FunCom)
        return (
            <div>
                <div>
                    <p>{this.state.count}</p>
                </div>
                <div>
                    姓名：<input ref={this.nameRef}/>
                </div>
                <div>
                    年龄：<ClassCom ref={this.ageRef}></ClassCom>
                </div>
                <div>
                    爱好：<FunComRef ref={this.hobbyRef}></FunComRef>
                </div>
                <div>
                    学历：<input ref={this.handleNameRef} type="text"/>
                    {/* 内联方式使用ref，不建议使用，每次都重新执行*/}
                    {/*学历：<input ref={*/}
                    {/*    (ele)=>{*/}
                    {/*        console.log("handleNameRef",ele)*/}
                    {/*        this.nameRef2 = ele*/}
                    {/* }*/}
                    {/*}*/}
                    {/*          type="text"/>*/}
                </div>
                <div>
                    其他：<FunCom2></FunCom2>
                </div>
                <div>
                    <button onClick={this.handleSave}>保存</button>
                    <button onClick={this.add}>add</button>
                </div>
            </div>
        )
    }
}

class ClassCom extends Component{
    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
    }
    getInputRef = ()=>{
        return this.inputRef
    }
    render() {
        console.log("render")
        return (
            <input type="text" ref={this.inputRef}/>
        )
    }
}

function FunCom(props,ref) {
    return(
        <input type="text" ref={ref}/>
    )
}
function FunCom2(){
    const r = useRef(null)

    return (
        <div>
            <input ref={r} type="text"/>
            {/*
            ! hook方式使用ref
            */}
            <button onClick={()=>{
                console.log("其他",r.current.value)
            }}>getValue</button>
        </div>

    )
}

export default RefsDemo