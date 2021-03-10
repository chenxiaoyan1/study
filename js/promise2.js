function getP1() {
    console.log('getP1开始调用')
    return new Promise((resolve, reject) =>{
        setTimeout(function(){
            console.log('getP1调用完成');
            resolve('getP1调用成功');
        }, 1000);
    });
}

function getP2() {
    console.log('getP2开始调用')
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            console.log('getP2调用完成');
            // resolve('getP2调用成功');
            reject("getP2调用失败")
        }, 2000);
    });
}
function getP3() {
    console.log('getP3开始调用')
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            console.log('getP3调用完成');
            resolve('getP3调用成功');
        }, 3000);
    });
}

Promise.all([getP1(), getP2(), getP3()])
    .then(res => {
        console.log('all：' + res)
    })
    .catch(err => {
        console.log('err: ' + err)
    })