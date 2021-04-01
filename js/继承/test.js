function parent(age,sex) {
    console.log("--------")
    this.age = age
    this.sex = sex
    this.type="person"
    this.arr =[1]
    this.say = function () {
        console.log("parent say")
    }
}
parent.prototype.money = function () {
    console.log("parent money")
}
parent.prototype.msg = "12"
parent.prototype.arr = [1]

var p = new parent(12,'ds')
console.dir(p)
console.log(p.msg)
p.msg = 'hello'
p.arr.push(2)
console.dir(p)