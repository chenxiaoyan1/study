async function async1() {
    console.log("async1 start")
    await async2()//!在事件循环中，await 就相当于new Promise 将await后面的放在
    //!里面，await下面的都放到then里，所以这里就相当于new Promise(function(){
    //! async2()
    // !}).then(function(){
    // !console.log("async1 end")
    // !})
    console.log("async1 end")
}
async function async2() {
    console.log("async2")
}

console.log("script start")
setTimeout(function () {
    console.log("settimeout")
},0)
async1()
new Promise(function (resolve) {
    console.log("promise1")
    resolve()
}).then(function () {
    console.log("promise2")
})
console.log("script end")

//script start
//async1 start
//async
//promise1
//script end
//async2
//async1 end
//promise2
//settimeout


