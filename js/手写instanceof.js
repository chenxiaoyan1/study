function f() {
    console.log(1)
}
// let fe = Object.getPrototypeOf(f)
// let fee = Object.getPrototypeOf(fe)
// let feee = Object.getPrototypeOf(fee)
// console.dir(fe)
// console.dir(fee)
// console.log(feee)
// console.log(f instanceof Object)

function myInstanceof(val,type) {
    //如果是基本类型直接返回false
    if(val == null ||typeof val != "object" ){
        return false;
    }
    //!getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(val);
    let re = false
    while (true){
        if(proto == type.prototype){
            re =  true
            return re;
        }
        proto = Object.getPrototypeOf(proto)
    }

    return re;
}

console.log(myInstanceof({},Object))
