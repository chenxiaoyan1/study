requestIdleCallback(workLoop)

function workLoop(deadline) {
    console.log("本帧剩余时间："+parseInt(deadline.timeRemaining()))
}

// requestIdleCallback(myNonEssentialWork, { timeout: 2000 });

// function myNonEssentialWork (deadline) {
//     //!deadline.timeRemaining()可以获取到当前帧剩余时间
//     //! 当回调函数是由于超时才得以执行的话，deadline.didTimeout为true
//     while ((deadline.timeRemaining() > 0 || deadline.didTimeout) &&
//     tasks.length > 0) {
//         doWorkIfNeeded();
//     }
//     if (tasks.length > 0) {
//         requestIdleCallback(myNonEssentialWork);
//     }
// }

/**
 React中的diff算法
 在React17+中，diff是根据老的fiber树和最新的jsx对比生成新的fiber树的过程
 React优化原则：
 只对同级节点进行对比，如果DOM节点跨层级移动，则React不会复用
 不同类型的元素会产生不同的结构，会销毁结构，创建新结构
 可以通过key标识移动的元素
 */