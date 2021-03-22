var num = 10
var obj = {num:20}
obj.fn = (function (num) {
    this.num = num*3
    num++
    return function (n) {
        this.num += n
        num++
        console.log(num)

    }
})(obj.num)

var fn = obj.fn
fn(5)//22
obj.fn(10)//23
console.log(num,obj.num)//!  这里用node执行（10，30）和浏览器执行（65，30）不一样
