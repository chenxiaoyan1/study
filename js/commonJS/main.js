var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done);

setTimeout(function () {
    console.log(a.done)
},3000)