// 如果一个函数已经定义了，但是我们需要扩展其功能，一般的处理方法
// 1、使用一个临时的函数名存储函数
// 2、重新定义原来的函数
// 3、定义扩展的功能
// 4、调用临时的那个函数

function fn() {
    console.log("函数本来功能")
}
var fnc = fn

fn = function () {
    fnc()
    console.log("扩展的功能")
}
fn()
