let arr1 = [1,2,3]
let arr2 = [4,5,6]

let f = arr1.push.bind(arr2,...arr1)
f()
console.log(arr1)
console.log(arr2)
console.dir(f)
let ff = f.bind([],1)
ff()
console.log(arr1)
console.log(arr2)
http://www.bubuko.com/infodetail-3130609.html