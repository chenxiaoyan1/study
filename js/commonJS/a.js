// exports.done = false;
// var b = require('./b.js');
// console.log('在 a.js 之中，b.done = %j', b.done);
// exports.done = true;
let a = true
setTimeout(function(){
    a =false
},2000)
exports.done=a;
console.log('a.js 执行完毕');
