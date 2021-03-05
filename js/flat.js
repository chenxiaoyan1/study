let arr = [1,2,[3,4],1,2,[5,[6,[7,8]]]]
//! 数据扁平化，去重-方式1 利用flat方式
let arr2 = [...new Set(arr.flat(Infinity))]
console.log(arr2)
console.log(arr)
//! 数据扁平化，去重方式2，利用toString()方式，数组.toString()不管多少级都会变成以逗号分隔的字符串
let arr3 =  arr.toString().split(",").map(x=>parseInt(x))
let arr4 = [...new Set(arr3)]
console.log(arr4)
console.log(JSON.stringify(arr))

//! 手写flat
~function(){
    function myFlat (){
        let result = []
        function fn(arr){
            for(let i = 0;i<arr.length;i++){
                if(Array.isArray(arr[i])){
                    fn(arr[i])
                }else{
                    result.push(arr[i])
                }
            }
        }
        fn(this)

        return result
    }
    Array.prototype.myFlat = myFlat
}()

let arrFlat = [1,2,[3,4],1,2,[5,[6,[7,8,7,9]]]]
console.log(arrFlat.myFlat())
