var p1 = new Promise(function(resolve, reject) {
    reject(1)
})
    .then(
        res => {
            console.log(res)
            return 2
        },
        err => {
            console.log(err)
            return 344
        }
    )
    .catch(err => {
        console.log(err)
        return 4
    })
    .finally(res => {
        console.log(res)
        return 5
    })
    .then(
        res => console.log(res),
        err => console.log(err)
    )

// resolve 的值是 undefined
Promise.resolve(2).then(() => {}, () => {})

