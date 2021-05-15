


let p1 = new Promise(function (resolve,reject) {
    setTimeout(function(){
        console.log(1)
        resolve(1)
    },3000)
})

let p2 = new Promise(function (resolve,reject) {
    setTimeout(function(){
        console.log(2)
        // resolve(2)
        reject(new Error("err2"))
    },1000)
})

let p3 = new Promise(function (resolve,reject) {
    setTimeout(function(){
        console.log(3)
        // resolve(3)
        reject(new Error("err3"))
    },1000)

})

Promise.all([p1,p2,p3]).then(function(res){
    console.log(res)
},function(e){
    console.log(e)
})