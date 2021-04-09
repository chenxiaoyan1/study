let arr = [1,2,3,[4,[5,6]],7,[8]]
//! 数组扁平化---方法1 flat
let arr1 = arr.flat(Infinity)
console.log(arr1)
//! 数组扁平化---方法2 JSON.parse("["+JSON.stringify(arr).replace(/\[|\]/g,"")+"]")
let str = JSON.stringify(arr).replace(/\[|\]/g,"")
str = "["+str+"]"
console.log(JSON.parse(str))
//! 数组扁平化---方法3 普通递归
let arr2 = []
function myFlat(arr) {
    for (let i = 0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            myFlat(arr[i])
        }else{
            arr2.push(arr[i])
        }
    }
}
myFlat(arr)
console.log(arr2)
//! 数组扁平化--方法4 扩展运算符
while (arr.some(x=>Array.isArray(x))){
    console.log(...arr)
    arr = [].concat(...arr)
}
console.log(arr)
