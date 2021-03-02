function* generator(){
    console.log("0");
    yield "hello";
    console.log("1");
    return "end"
    yield  "Generator";
    console.log("2");
    yield "word"
    console.log("3")

}

var g = generator()
console.log(g.next())
console.log(g.next())
console.log(g.next())
//
// var a = 0;
// function* fun() {
//     let aa = yield (a = 1 + 1);
//     return aa;
// }
// console.log("fun0", a);
// let b = fun();
// console.log("fun", b.next());//注释下这句句试试，⽐比 较下前后a的值 console.log("fun1", a);