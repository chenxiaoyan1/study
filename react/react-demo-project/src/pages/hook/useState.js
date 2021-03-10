import {useState} from "react";

function UseStateTest(props) {
    //* 声明⼀一个叫 “count” 的 state 变量量，初始化为0
    const [count,setCount] = useState(0)

    return (
        <div>
            <p>count:{count}</p>
            {/*
            ! 用户点击后我们传递一个新的值给 setCount，React会重新渲染该组件,并把最新的count传给他
            */}
            <button onClick={()=>{setCount(count+1)}}>add</button>
        </div>
    )
}


export default UseStateTest