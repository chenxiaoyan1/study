let arr = [1,2,3,4,5,6]
try {
    arr.forEach((x)=>{
        console.log(x)
        if (x==3){
            throw new Error("中断");
        }
    })
}catch (e) {
    // console.log(e)
}

for (let i =0;i<arr.length;i++){
    console.log(i)
    if(i==3){
        break;
    }
    console.log("-")
}