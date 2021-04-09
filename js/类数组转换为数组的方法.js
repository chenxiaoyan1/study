function f() {
    console.log(arguments)
    console.log(Array.isArray(arguments))
    //! 类数组转化为数组方法1
    let arr = Array.prototype.slice.call(arguments)
    //slice 不修改原数组，返回新数组
    //splice 改变原数组，返回被修改的原数组
    console.log(arr)
    console.log(Array.isArray(arr));
    //! 类数组转化为数组的方法2
    let arr2 = [...new Set(arguments)]
    console.log(arr2)
    console.log(Array.isArray(arr2))
    //! 类数组转化为数组的方法3
    let arr3 = Array.from(arguments)
    console.log(arr3)
    console.log(Array.isArray(arr3))
    //! 类数组转化为数组的方法4
    let arr4 = [...arguments]
    console.log(arr4)
    console.log(Array.isArray(arr4))



}
f(1,2,3,4,5,6)