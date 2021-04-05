let arr = [1,2,3,4,5,6]
// ! 判断数组中是否包含某个值--方法1
if(arr.indexOf(0) != -1){
    console.log("存在")
}else{
    console.log("不存在")
}
// ! 判断数组中是否包含某个值--方法2
console.log(arr.includes(43))
// ! 判断数组中是否包含某个值--方法3
let a = arr.find(x=>x==60)
console.log(a)
// ! 判断数组中是否包含某个值--方法4
let b = arr.findIndex(x=>x==30)
console.log(b)