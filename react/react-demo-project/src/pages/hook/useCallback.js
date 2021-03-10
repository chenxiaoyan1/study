import React, { useState, useCallback, PureComponent,Component } from "react";

function UseCallbackTest(props) {
    const [count, setCount] = useState(0);
    const addClick = useCallback(() => {
        console.log("calback")
        let sum = 0;
        for (let i = 0; i <= count; i++) {
            sum += i;
        }
        return sum;
        }, [count]);//! addClick这个函数以来count的变化，当count变化时，表示addClick变化，若count没有变化，表示addClick没有变化
    const [value, setValue] = useState("");
    return (
        <div>
            {console.log("UseCallbackTest")}
            <h3>UseCallbackPage</h3>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
            {/*
            ! 当在input框输入值时，传递一个新的值给setValue，React重新渲染该组件，也就是会重新渲染chid组件
            ! child组件继承PureComponent,若useCallback没有第二个参数，他每次渲染认为这个函数不一样，child就会每次
            !都渲染，若useCallback有第二个参数，表示他依赖count的变化，每次输入input的值，count没有变化
            !则认为这个函数没有变化，不会每次渲染child组件，性能得到优化
            */}
            <input value={value} onChange={event => setValue(event.target.value)} />
            <Child addClick={addClick} />
        </div>
    );
}
class Child extends PureComponent{
    render() {
        console.log("child render");
        const {addClick} = this.props;
        return (
            <div>
                <h3>Child</h3>
                <button onClick={() => console.log(addClick())}>add</button>
            </div>
        );
    }
}

export default UseCallbackTest