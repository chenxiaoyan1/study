Function.prototype.bind3 = function (thisArg) {
    //this 为原函数 thisArg为传入的this对象
    if(typeof this !== "function"){
        throw new TypeError("不是function")
        return;
    }
    let that = this
    let args = Array.prototype.slice.call(arguments,1)
    let fBound =  function(){
       return that.apply(thisArg,args.concat(Array.prototype.slice.call(arguments)))
        // that.apply(that instanceof fBound?that:thisArg,args.concat(Array.prototype.slice.call(arguments)))
    }
    return fBound
}
if (!Function.prototype.bind2) {
    Function.prototype.bind2 = function (oThis) {
        // 同样先判断甲方是不是一个函数
        if (typeof this !== 'function') {
            throw new TypeError('当前调用bind方法的不是函数！')
        }

        // 获取参数
        var args = Array.prototype.slice.call(arguments, 1)
        var fToBind = this
        var fBound = function () {
            return fToBind.apply(this instanceof fBound
                ? this
                : oThis, args.concat(Array.prototype.slice.call(arguments)))
        }

        // 第五步
        var fNOP = function() {}

        if (this.prototype) {
            fNOP.prototype = this.prototype;
        }
        // 下行的代码使fBound.prototype是fNOP的实例,因此返回的fBound若作为new的构造函数
        // new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
        fBound.prototype = new fNOP();

        return fBound
    }
}








// var o1 = { a: 1 }
// var o2 = { b: 2 }
// var f = function () {
//     console.log(this)
//     console.log([].slice.call(arguments))
// }
//
// var f1 = f.bind2(o1, 1, 2) // A行
// var f2 = f1.bind2(o2, 3, 4) // B行
// //
// f2(5, 6) // C行


const bar = function() {
    this.age=23
    console.log(this.name, arguments);
};
bar.prototype.name = 'bar';
const foo = {
    name: 'foo'
};
// const bound = bar.bind3(foo, 22, 33, 44);
// bound(77); // foo, [22, 33, 44, 55]
// let b = new bound(55, 66); // bar, [22, 33, 44, 55, 66]
// console.dir(b)
const bound2 = bar.bind2(foo, 22, 33, 44);
bound2(77); // foo, [22, 33, 44, 55]
let b2 = new bound2(55, 66); // bar, [22, 33, 44, 55, 66]
console.dir(b2)
/**
 * ! bind总结：
 * 结论：1、对一个函数多次bind，多次修改this 指向，最后一次调用执行，此时this为第一次的bind绑定的this
 *     返回的fBound形成调用链，每一个fBound都引用上一个fBound，尾端是原函数
 *
 *     //f1
 // f1 = function () {
//     return fToBind.apply(oThis, args.concat(Array.prototype.slice.call(arguments)))
// }
 //
 // //f2
 // f2=function(){
//     f1.apply(oThis, args.concat(Array.prototype.slice.call(arguments)))
// }
 先执行f2 ,f2里有f1.apply就去执行f1,f1里有原函数的apply,执行原函数，所以原函数里的this就是第一次bind时绑定的this
 *     2、bind时传入的参数（包含多次bind时传入的参数）和调用执行时传入的参数，最后都会合并在一起，作为原函数的参数
 *      3、使用new 操作绑定bind返回的构造函数，曾经绑定的this失效
 */
// https://juejin.cn/post/6844903999791955982#heading-3