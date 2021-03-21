//! 自定义实现hook，不用启动react服务，直接打开hook.html即可查看hook自定义实现的结果

//是否是第一次渲染都标志
let isMount = true;
//表示正在处理都hook
let workInProgressHook = null
// 一个组件对应一个fiber节点
const fiber = {
    stateNode:App,//function组件本身
    memoizedState:null//*是一个hook的链表，一个useState对应一个hook function组件代表hooks都数据，class组件代表state数据
}

function useState(initialState) {
    debugger
    //对应都哪个hook
    let hook = null;//是一个链表
    if(isMount){
        //首次渲染
        //hook 是一个单向链表
        hook = {
            memoizedState : initialState,//这个hook的state的值
            next :null,
            //!环状链表
            queue:{
                pending:null
            }
        }
        if(!fiber.memoizedState){
            fiber.memoizedState = hook
        }else{
            workInProgressHook.next = hook
        }
        //设置指针指向当前hook
        workInProgressHook = hook
    }else{
        //不是首次渲染，update的情况下
        hook = workInProgressHook //这里的workInProgressHook是第一个hook，因为每次update都schedule，schedule中设置workInProgressHook指向第一个
        workInProgressHook = workInProgressHook.next
    }
    //根据queue计算state
    let basicState = hook.memoizedState
    debugger
    if(hook.queue.pending){
        let firstUpdate = hook.queue.pending.next
        do {
            const action = firstUpdate.action
            basicState = action(basicState)
            firstUpdate = firstUpdate.next
        }while (firstUpdate !== hook.queue.pending.next)//到此条件时循环结束
        //清空update任务
        hook.queue.pending = null
    }
    hook.memoizedState = basicState
    return [basicState,dispatchAction.bind(null,hook.queue)]

}
function dispatchAction(queue,action) {
    debugger
    //环状链表
    const update = {
        action,
        next:null
    }
    if(queue.pending === null){
        //只有一个update,u0-->u0
        update.next = update
    }else{
        // !这里没有形成环状链表，每次只有个update？？？？？？？？
        //? u1-->u0-->u1 这里为什么不是u0-->u1-->u0呢
        update.next = queue.pending.next;//queue.pending.next表示第一个update
        queue.pending.next = update
    }
    //queue.pending指向最后一个update
    queue.pending = update
    //每一次updateNum就更新一次页面
    schedule()
}

// 调度方法，每次更新都调度
function schedule() {
    //设置指针指向第一个
    workInProgressHook = fiber.memoizedState
    const app = fiber.stateNode();
    isMount = false //第一次渲染后将isMount设置为false，为false就代表着是修改了
    return app;
}


// 模拟函数组件
function App() {
    const [num,updateNum] = useState(0)
    const [num1,updateNum1] = useState(10)
    console.log("isMount",isMount)
    console.log("num",num)
    console.log("num1",num1)
    return {
        onClick(){
            updateNum(num => num+1)
            updateNum(num => num+2)
        },
        onHover(){
            updateNum1(num=>num+10)
        }
    }
}

//挂载window上，方便测试
window.app = schedule()