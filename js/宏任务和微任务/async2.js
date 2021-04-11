console.log("start")
setTimeout(()=>{  //hong
    console.log("children2")
    Promise.resolve().then(()=>{
        console.log("children3")
    })
},0)

new Promise(function (resolve,reject) {
    console.log("children4")
    setTimeout(function () {//hong
        console.log("children5")
        resolve("children6")//! 这里resolve了，下面的then此时才会加入到微任务队列中
    })
}).then((res)=>{//! 注意这里，第一次这个then是不会进入微任务的，因为这个then一定要在resolve出去，才会进入微任务，这里resolve没有直接出去，
    //所以这个then不会进入微任务
    console.log("children7")
    setTimeout(()=>{
        console.log(res)
    },0)
})
//start,children4,children2,children3,children5,children7,children6
