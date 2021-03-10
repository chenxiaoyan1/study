import {useEffect, useState} from "react";

function UseEffectTest(props) {
    console.log("useEffectTest")
    const [count,setCount] = useState(0)
    const [count2,setCount2] = useState(0)
    const [date, setDate] = useState(new Date());


    //! useEffect 第一个参数必须，第二个参数非必须，
    //! 第二个参数表示:当第二个参数变化时才会执行第一个参数,当第二个参数是空数组时，表示只执行一次，不再重复执行
    //! 当第一个参数返回一个函数时，表示清除函数，不是必须的，当需要清除副作用时return一个函数，
    useEffect(()=>{
        console.log("useEffect")
        document.title = `you clicked ${count} times`
        return ()=>{
            //!React 会在执行当前 effect 之前对上一个 effect 进行清除,每次更新渲染时都会先执行clean再执行effect
            console.log("clean")
        }
    },[count])

    useEffect(() => {
        console.log("useEffect2")
        const timer = setInterval(() => {
            setDate(new Date());
            }, 3000);

        return ()=>{
            clearInterval(timer)
        }
        },[]);


    return (
        <div>
            <p>count:{count}</p>
            <button onClick={()=>{setCount(count+1)}}>add</button>
            <p>{date.toLocaleTimeString()}</p>
        </div>
    )
}

export default UseEffectTest