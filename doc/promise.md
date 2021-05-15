# promise
```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
promise.then(function(){
//当promise的状态变为成功时调用，如果没有调用resolve函数，promise的状态不是成功，此函数就不会调用
},function(){
//当promise的状态变为失败时调用
})
```
- resolve函数执行后，将Promise的状态从“未完成”变为“成功”，在异步操作成功后调用，并将结果作为参数传递出去
- reject函数执行后，将Promise的状态从“未完成”变为“失败”，在异步操作失败后调用，并将错误作为参数传递出去
- .then和.catch都会返回一个新的promise，不管.then和.catch中是否有return，都会返回一个新的promise，如果return的是一个promise，则不做处理，如果返回的是一个非promise的值会被包裹为promise对象，例如return 2会被包装为return Promise.resolve(2),其实链式调用的本质就是因为他then和catch之后返回的是promise
```js
let pr = Promise.resolve("p11").then(function (data) {
    console.log(data)//data12
    // return p2
},function (err) {
    console.log(err)
})
    .then(function (data2) {
        console.log(data2)
        return 2
    })
    .then(function (data3) {
        console.log(data3)
    })
    // p11 undefined 2
```
- promise的状态一经改变就不能再改变
```js
const promise = new Promise((resolve, reject) => {
  resolve("success1");
  reject("error");
  resolve("success2");
});
promise
.then(res => {
    console.log("then: ", res);
  }).catch(err => {
    console.log("catch: ", err);
  })
//最后结果是success1，promise的状态一经改变就不会再改变
```
- .then和.catch可以被调用多次，但是Promise构造函数只执行一次，或者说promise的内部状态一经改变，并且有了一个值，那么后续多次调用.then或者.catch都会直接拿到该值
```js
let pr = Promise.resolve(Date.now()).then(function (data) {
    console.log(data)//data12
    return data
},function (err) {
    console.log(err)
})
   pr.then(function (data2) {
        console.log(data2)
    })
    pr.then(function (data3) {
        console.log(data3)
    })
    //打印出来的数据都是一样的
```
- .then或者.catch中return一个error对象并不会抛出错误，不会被后续catch捕获，return new Error('error!!!')也被包裹成了return Promise.resolve(new Error('error!!!'))。
想抛出错误的话，用下面：
```js
return Promise.reject(new Error('error!!!'));
// or
throw new Error('error!!!')
```
- .then或者.catch不能returnpromise本身，否则会造成死循环
- finally方法的回调函数不接受任何参数，finally中不知道promise的状态是失败还是成功，没有办法获得此时promise的执行结果，finally会返回一个promise，特殊的是返回的promise是上一个promise的值包装成的新promise，不管finally中return什么
```js
var p1 = new Promise(function(resolve, reject) {
    reject(1)
})
    .then(
        res => {
            console.log(res)
            return 2
        },
        err => {
            console.log(err)
            return 344
        }
    )
    .catch(err => {
        console.log(err)
        return 4
    })
    .finally(res => {
    //finally回调函数没有任何参数
        console.log(res)//undefined
        return 5//finally返回的promise是上一个promise的值包装的新promise，所以这里return不管返回什么都不生效
    })
    .then(
        res => console.log(res),
        err => console.log(err)
    )
    //1 undefined 344
```
```js
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
 * 调用下一个then,链式调用；
.then 在链式调用时，会等其前一个 then 中的回调函数执行完毕，并且返回成功状态的 promise，才会执行下一个 then 的回调函数，而且 .then 方法的参数就是上一个 .then 方法中 resolve 的参数。

所以链式调用比较常用的一个场景就是，当下一个操作依赖于上一个操作的结果或状态的时候，可以很方便地通过 .then 方法的参数来传递数据。
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


```
# 关于promise的面试题
- Promise.all中如果有一个抛出异常了会如何处理
> all和race传入的数组中如果有任务抛出异常，那么只有最先抛出异常的错误会被捕获，并且是被then的第二个参数或者后面的catch捕获，但不会影响数组中其他异步任务的执行
- Promise为什么能链式调用
> 由于then,catch,finally方法会返回一个新的promise，所以可以链式调用

- Promise.all是并发的还是串行的
>并发的，不过Promise.all().then()结果中数组的顺序和Promise.all()接收到的数组顺序一致