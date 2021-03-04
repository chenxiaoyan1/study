let arr = [10,20,30]

let obj = {}

function fn(x,y,z){
    console.log(this,x,y,z)
}

fn.call(obj,...arr)

fn.apply(obj,arr)


//! call参数是分开传递，apply参数是放到一个数组中传递
