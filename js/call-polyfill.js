Function.prototype.call2 = function (thisArg) {
    // thisArg是调用call的时候参数中的第一个参数，也就是Food的实例对象
    debugger
    // 先判断当前的甲方是不是一个函数（this就是Product，判断Product是不是一个函数）
    if (typeof this !== 'function') {
        throw new TypeError('当前调用call方法的不是函数！')
    }

    // 保存甲方给的参数（args就是 ['cheese', 5]）
    const args = [...arguments].slice(1)

    // 确定乙方的类型，因为可以传null和undefined(thisArg就是Food的实例对象)
    thisArg = thisArg || window

    // 将甲方的内容保存为乙方的一个属性,为了保证不与乙方中的key键名重复
    const fn = Symbol('fn')

    // 这个时候的thisArg就是
    // {
    //    category: 'food',
    //    Symbol(fn): function() { this.name = name, this.price = price }
    // }
    thisArg[fn] = this

    // 执行保存的函数,这个时候作用域就是在乙方的对象的作用域下执行，改变的this的指向
    const result = thisArg[fn](...args)

    // 执行完删除刚才新增的属性值
    delete thisArg[fn]

    // 返回执行结果
    return result
}
let o = {
    name:1
}
function fun(){
    console.log(this.name)
}
fun.call2(
    o,1,2
)

