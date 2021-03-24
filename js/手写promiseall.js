function PromiseAll(promiseArray){
    return new Promise((resolve, reject)=>{
        if(!Array.isArray(promiseArray)){
            return reject(new Error("传入的参数必须是数组"))
        }
        const res = []
        const promiseNums = promiseArray.length
        let counter = 0
        for (let i=0;i<promiseNums;i++){
            Promise.resolve(promiseNums[i]).then(value=>{//这里即使传入的参数数组中有常量也不怕，因为Promise.resolve会将其转化成
// promise
                counter++
                res[i] = value//这里不能直接用push,因为会有顺序问题，不一定哪个先返回
                if(counter===promiseNums){//这里不能用res.length===promisenums 因为数组长度特性 arr[8]=0,arr的长度为9
                    resolve(res)
                }
            }).catch(e=>reject(e))
        }
    })

}