const p =function () {
 return new Promise((resolve,reject)=>{
     const p1 = new Promise((resolve,reject)=>{
         setTimeout(()=>{//hong
             resolve(1)//! 这里的resolve就没用了，因为下面的resolve先触发，promise状态已变化，所以这个resolve就不会触发then了
         },0)
         resolve(2)
     })
     p1.then((res)=>{
         console.log(res)//wei
     })
     console.log(3)
     resolve(4)
 })
}
p().then(res=>{
    console.log(res)//wei
})
console.log("end")
//3,end,2,4