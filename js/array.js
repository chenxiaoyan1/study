var arr = [1,2,3,4,5]

// arr.push("6")//尾部加
// arr.pop()//尾部减
// arr.shift()//头部减
// arr.unshift(0)//头部加
Array.prototype.myPush=function(val){
    this[this.length] = val
    return this.length
}
Array.prototype.myPop = function () {
    this.length = this.length-1
    return this.length
}
Array.prototype.myShift = function () {
    //头部减
}
Array.prototype.myUnshift = function (val) {
    //头部加
}
var l = arr.myPush(7)
arr.myPop()

console.log(arr,arr.length)