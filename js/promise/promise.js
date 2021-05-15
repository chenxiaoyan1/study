const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve('success')
    console.log(2);
});
promise.then(() => {
    console.log(3);
});
console.log(4);



const promise2 = new Promise((resolve, reject) => {
    resolve("success1");
    reject("error");
    resolve("success2");
});

let  p = promise2
    .then(res => {
        console.log("then: ", res);
    }).catch(err => {
    console.log("catch: ", err);
})
console.log(p)


