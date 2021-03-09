// promise
//! Promise一般来讲是一个对象，.then方法是promise对象对一个方法

/**
 * Promise构造函数接收一个函数A作为参数，函数A有2个参数，resolve和reject，
 * 调用resolve这个函数，标记为成功，调用reject这个函数，标记为失败；
 * resolve和reject在调用时，可以传递数据，这个数据会被传递给成功或失败的回调函数中
 * 在这个函数A中可以执行异步操作，在这个函数中执行完成异步操作之前，
 * 并不是调用用户提供的回调函数（不关心回调到底是什么），而是在这个函数中，异步操作完成后
 * 修改当前promise的状态
 *
 */

/**
 * Promise的状态
 * pendding:挂起，当前promise正在执行任务
 * fullfilled:完成任务，成功状态
 * rejected：完成任务，失败状态
 * */

/**
 * Promise对象的.then方法接收的成功的回调函数会在promise对象处于成功(fullfilled)状态下自动执行
 * Promise对象的.then方法接收到的失败的回调函数会promise对象处于失败(rejected)状态下自动执行
 * then方法的返回值有两种：
 * 1、promise对象：
 * 调用下一个then
 * 2、普通值：
 * 将该普通值传递给下一个then,作为then中回调函数的参数
 * */
var p =new Promise(function (resolve,reject) {
    setTimeout(function () {
        //!resolve将promise的状态置为成功fullfielled
        resolve("data12")
    },1000)
})

p.then(function (data) {
    //!data为resolve函数传递的数据
    //! 成功回调，会在promise的状态变为fullfilled成功时自动执行
    console.log("成功回调")
    console.log(data)//data12
    return data
},function (err) {
    //! err为reject函数传递的数据
    //!失败回调，会在promise的状态变为rejected失败时自动执行
    console.log("失败回调")
    console.log(err)
})
    .then(function (data2) {
        console.log(data2)
        return data2
    })
    .then(function (data3) {
        console.log(data3)
    })


//* 写法1
p.then(function (data) {
    console.log("成功的回调")
},function (err) {
    console.log("失败的回调")
})
//* 写法2
p.then(function (data) {
    console.log("成功的回调")
})
    .catch(function () {
    console.log("失败的回调")
})
//* 写法1和写法2是效果一样的，不过写法2在出现代码异常的时候不会报错卡死，而是进入catch中

